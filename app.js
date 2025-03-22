// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGPqzH7H2tBvuCoIDJcmq9ZxoGkPL1R10",
    authDomain: "watpad.firebaseapp.com",
    databaseURL: "https://watpad-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "watpad",
    storageBucket: "watpad.firebasestorage.app",
    messagingSenderId: "664783349089",
    appId: "1:664783349089:web:7b28efdc2d9d062dddd120",
    measurementId: "G-VL4S9SQG0P"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ✅ Function to update webpage with new data
function updatePage(data) {
    if (data) {
        document.getElementById("bacteriaImage").src = data.image_url || "";
        document.getElementById("ecoliCount").textContent = data.e_coli_count || "N/A";
        document.getElementById("coliformCount").textContent = data.coliform_count || "N/A";
        document.getElementById("totalCount").textContent = (data.e_coli_count + data.coliform_count) || "N/A";
        document.getElementById("potability").textContent = data.potable ? "Safe" : "Not Safe";
        document.getElementById("timestamp").textContent = new Date(data.timestamp * 1000).toLocaleString();
    }
}

// ✅ Listen for the latest data in Firebase
database.ref().orderByChild("timestamp").limitToLast(1).on("child_added", (snapshot) => {
    const data = snapshot.val();
    console.log("🔄 New data received:", data);
    updatePage(data);
});
