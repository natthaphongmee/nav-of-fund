const fetch = require('node-fetch');
const jsdom = require('jsdom');

const getFundsData = () => {
    const args = process.argv.slice(2);

    if (args.length > 1) {
        console.log('Please provide fund name only one.');
        return;
    }

    if (args[0] === undefined) {
        console.log('Please provide fund name.');
        return;
    }

    fetch('https://codequiz.azurewebsites.net/', {
        headers: {
            Cookie: 'hasCookie=true'
        }
    })
        .then((res) => res.text())
        .then((data) => {
            const { JSDOM } = jsdom;
            const rows = new JSDOM(data).window.document.querySelectorAll('tr');

            let fundNameList = [];
            for (let i = 1; i < rows.length; i++) {
                const fundName = rows[i].getElementsByTagName('td')[0].textContent;
                fundNameList.push(fundName.trim());
                if (args[0].trim() === fundName.trim()) {
                    const nav = rows[i].getElementsByTagName('td')[1].textContent
                    console.log(`${fundName} has NAV = ${nav}`);
                }
            }

            if (!fundNameList.includes(args[0].trim())) {
                console.log('Fund name is incorrect. Please check and try again.')
            }
        });
}

getFundsData();