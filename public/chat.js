
firebase.initializeApp({
    apiKey: 'AIzaSyCqVgBdE9DDk9qUyV8HXgOLuGDgFPWVT_I',
    authDomain: 'check-it-a5623.firebaseapp.com',
    projectId: 'check-it-a5623',
    storageBucket: "check-it-a5623.appspot.com",
    messagingSenderId: "778597486906",
    appId: "1:778597486906:web:17b8eb8f0bad993fb04003",
    measurementId: "G-Z60NZVGSCG"
});

function send() {
    let message = document.getElementById("message").value;
    console.log(message);
    if (message.length > 0) {
        fetch(`${window.location.origin}/chat/create/${window.location.pathname.split('/').at(-1)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message }),
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("message").value = "";
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

function get() {
    const courseId = window.location.pathname.split('/').at(-1);
    const db = firebase.firestore();
    db.collection("chats").doc(courseId)
        .onSnapshot((doc) => {
            fetch(`${window.location.origin}/chat/read/${courseId}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    let content = "";
                    for (let i = 0; i < data.length; i++) {
                        if (document.getElementById("userid").value == data[i].userId) {
                            console.log("sender");
                            content += `
                    <div class="flex justify-end" >
                    <div class="rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-blue-300 my-2 p-2 inline-block" >
                        <p class="text-sm font-semibold" >${data[i].author}</p>
                        <p>${data[i].message}</p>
                        <p class="text-xs">${formatTime(data[i].createdAt)}</p>
                    </div>
                    </div>
                `;
                    }else{
                        console.log("notsender");
                        content += `
                    <div class="justify-start">
                    <div class="rounded-tr-2xl rounded-bl-2xl rounded-br-2xl bg-gray-300 my-2 p-2 inline-block" >
                        <p class="text-sm" >${data[i].author}</p>
                        <p>${data[i].message}</p>
                        <p class="text-xs">${formatTime(data[i].createdAt)}</p>
                    </div>
                    </div>
                `;
                    }



                    }
                    document.getElementById("chat").innerHTML = content;
                    window.scrollBy(0, document.body.scrollHeight);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
}

function formatTime(time) {
    // TODO: FORMAT TIME
    return time;
}

document.getElementById("send-btn").addEventListener('click', send);
get();