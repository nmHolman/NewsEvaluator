function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('submission').value;

    if (formText != '') {
        Client.postData('http://localhost:8080/add', formText);

        fetch('http://localhost:8080/sentiment')
            .then(res => res.json())
            .then(function (res) {
                document.getElementById('subjectivity').innerHTML = res.subjectivity;
                document.getElementById('agreement').innerHTML = res.agreement;

                let sub = [];

                try {
                    res.sentence_list.forEach(s => {
                        let sText = s.text;
                        if (s.score_tag == 'P+') {
                            sub.push(`<span class='strongPos'>${sText}</span>`);
                        } else if (s.score_tag == 'P') {
                            sub.push(`<span class='pos'>${sText}</span>`);
                        } else if (s.score_tag == 'NEU') {
                            sub.push(`<span class='neu'>${sText}</span>`);
                        } else if (s.score_tag == 'N') {
                            sub.push(`<span class='neg'>${sText}</span>`);
                        } else if (s.score_tag == 'N+') {
                            sub.push(`<span class='strongNeg'>${sText}</span>`);
                        } else {
                            sub.push(sText);
                        }
                    });
                } catch (err) {
                    sub.push('Nothing was submitted.')
                }

                let fullText = sub.join(' ');
                document.getElementById('submittedText').innerHTML = `<p>${fullText}</p>`;

                Client.updateLayout();
               
            })
    } else {
        document.getElementById('submittedText').innerHTML = `<p>Nothing was submitted!</p>`;
        Client.updateLayout();
        return 'Success';
    }


}

export {
    handleSubmit
}