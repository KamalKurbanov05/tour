export const sendForm = (message, isSendMsg, isError) => {
    const TOKEN = "5989860799:AAG_HhzTKsEovN42f3QyPExdIYzVUGDflWc";
    const CHAT_ID = "-1001892252978";
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${JSON.stringify(message)}`;


    fetch(URI_API, {
        method: "GET"
    }).then(() => {
        isSendMsg();
    })
        .catch((e) => {
            isError();
        });
}



