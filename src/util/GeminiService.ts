import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

@Injectable()
export class GeminiService {
    private gemini: GoogleGenerativeAI;
    private model: GenerativeModel
    private readonly stage = ['recommend', 'ok', 'aware', 'avoid', 'dangerous']

    constructor(
        readonly configService: ConfigService,
    ) {
        // this.gemini = new GoogleGenerativeAI('AIzaSyB1k4s9J_gIt6tXjdHWGMIxyhsyF9nq6bE');
        this.gemini = new GoogleGenerativeAI('AIzaSyAdhceZxxYYzl1r9JboB-jQn8F8azTK6bM')
        this.model = this.gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
    }


    async analyze(foodSentence: string): Promise<any> {
        let result = {}
        const regWithoutSpace = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
        const regWithSpace = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim;

        const foodAnalysisResult = await this.model.generateContent(`The user said they want to eat the following food: "${foodSentence}".
             Determine whether the food is harmful to pregnant women in the order of recommend, ok, aware, avoid, dangerous, and write it. Foods that do not require restrictions, e.g.
            Anchovies • Arrowhead • Barracouta • Cod • Flounder • Brown trout (excluding Ellesmere Herring) • Clams • Eel, long-fin or short-fin • Tropical fish • Flounder • Gemfish • Bream • Hoki • John Dory • Lin Lin • Mussels (green and turquoise) • Orange perch • Orange roughy • Oreo dory • Oysters (except Bluff and Pacific) • Farore • Scallops (except queens) • Backup trout (excluding non-geothermal areas only) • Skipjack tuna (limited to non-geothermal areas) No data on swordfish) • Smooth Oreo • Halibut (except lemon halibut) • Southern blue whiting • Surfer clams (e.g. tuatua) • Tarakihi • Scallopfish, Antarctic • Werehoe (regular, silver and ) • Whitebait ( Inanga) etc.
            These belong to the Recommend stage and the OK stage. Can be consumed 3-4 times a week, Tuna • Alphonsino • Sea bass • Bluenose • Ghost shark • Herring • Hapuka (groper) • Spearfishing • Kahawai • Kingfish • Lake Taupo trout • Leatherjacket • Lemon sole • Mackere, Sikhye, l (blue and jack) • Red cod Foods such as • Rivaldo • Rig (lemon fish, spotted shark) • Rock Lobster • Salmon (farmed) • Sea Bass • Silverside • Stingray • Bream • Herring • Trevally belong to the aware and avoid stages.
            All you have to do is determine the data on what stage the food belongs to. result is only one word`);
        const response = await foodAnalysisResult.response;
        const text = await response.text().replace(regWithoutSpace, "").slice(0, -1);

        if (this.stage.indexOf(text.toLowerCase()) > 1) {
            let res = await this.model.generateContent(`Tell me why ${foodSentence} is bad for pregnant women max words is 15 words`);
            let response = await res.response;
            let text = await response.text().replace(regWithSpace, "").slice(0, -1);
            result['explanation'] = text;

            res = await this.model.generateContent(`Please tell me one food that pregnant women can eat instead of ${foodSentence}. max words is 15 words.`);
            response = await res.response;
            text = await response.text().replace(regWithSpace, "").slice(0, -1);

            result['subsitute'] = text;
        }

        result['text'] = text;
        return result;
    }
}