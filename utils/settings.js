const settings = {
    djinni: {
        src: 'djinni',
        root: `https://djinni.co`,
        linkSelector: '.profile',
        contentSelector: '.list-jobs__description p',
        template: (keywords, expLevel, dictionary) => {
            keywords = keywords.map(keyword => encodeURIComponent(keyword))
            const localExp = dictionary[expLevel]
            return `https://djinni.co/jobs/?exp_level=${expLevel}y${
                keywords.length === 0 ?
                    '' :
                    '&keywords=' + keywords.join('+')
            }`
        },
        dictionary: {
            0: 'no_exp',
            1: '1y',
            2: '2y'
        }
    },
    dou: {
        src: 'dou',
        root: ``,
        linkSelector: '.vt',
        contentSelector: '.sh-info',
        template: function (keywords, expLevel, dictionary)  {
            const localExp = dictionary[expLevel]
            keywords = keywords.map(keyword => encodeURIComponent(keyword))
            return `https://jobs.dou.ua/vacancies/?category=Front+End&search=${
                keywords.length === 0 ?
                    '' :
                    '&keywords=' + keywords.join('+')
            }&exp=${localExp}`
        },
        dictionary: {
            0: '0-1',
            1: '0-1',
            2: '1-3'
        }
    },
    workua: {
        src: 'workua',
        root: `https://www.work.ua`,
        linkSelector: '.card h2 a',
        contentSelector: '.card p',
        template: function (keywords, expLevel, dictionary)  {
            keywords = keywords.map(keyword => encodeURIComponent(keyword))
            return `https://www.work.ua/ru/jobs${keywords.length === 0 ?
                '/?ss=1' :
                '-' + keywords.join('+')
            }/`
        }
    }
}

export {settings}