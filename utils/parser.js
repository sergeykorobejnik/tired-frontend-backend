import axios from "axios";
import * as cheerio from "cheerio"
import {IdGenerator} from "./IdGenerator.js";


const textToArr = text  => {
    const lineReg = new RegExp("[^\\n]+", "gm")
    const wordsReg = new RegExp("(\\w)+", "gm")


    let result = text.match(lineReg)
    result = result.filter(element => wordsReg.test(element))
    result = result.map(item => item.trim())
    return result
}




const parseData = async ({root, template, src, linkSelector, contentSelector, dictionary}
    ,keywords, expLevel, callback) =>  {


    const localTemplate = template(keywords, expLevel, dictionary)
    //console.log(localTemplate)


    try {
        const response = await axios.get(localTemplate)
        const data = await response.data
        const $ = cheerio.load(data)


        const titlesArr = $(linkSelector).toArray().map(item => $(item).text().trim()),
            contentArr = $(contentSelector).toArray().map(item => $(item).text().trim()),
            linksArr = $(linkSelector).toArray().map(item => root + item.attribs.href)


        if(titlesArr.length !== contentArr.length && titlesArr.length !== linksArr.length) throw new Error('Data doesn`t equal')


        const itemArr = []


        for (let i = 0; i < titlesArr.length; i++) {
            itemArr.push({
                id: IdGenerator(titlesArr[i]),
                src: src,
                link: linksArr[i],
                title: titlesArr[i],
                text: contentArr[i],
            })
        }

        callback(itemArr)

    } catch (e) {
        console.log("Error: ", e.message);
    }
};


async function parser ({srcState, keywords, expLevel}, settings) {
    try {
        //Transform keywords array from client
        keywords = keywords.map(item => item.text)
        console.log(keywords)


        const {djinni, dou, workua} = srcState
        let dataArr = []


        function setData() {
            return function (payload) {
                dataArr = [...dataArr, ...payload]
            }
        }


        if (djinni) await parseData(settings.djinni, keywords, expLevel, setData())
        if (dou) await parseData(settings.dou, keywords, expLevel, setData())
        if (workua) await parseData(settings.workua, keywords, expLevel, setData())


        return dataArr
    } catch (e) {
        console.log(e)
    }
}

export {parser}