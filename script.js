async function sendData() {
    // LIFFの初期化
    await liff.init({ liffId: "2006951148-WNJM4Ldq" });

    // ユーザーのLINEプロフィール情報を取得
    const profile = await liff.getProfile();
    const lineId = profile.userId;  // LINE ID
 //   const lineId = "1234";  // LINE ID (デバッグ用に固定)

    // フォームの入力内容を取得
    const name = document.getElementById("name").value;
    const company = document.getElementById("company").value;

    // GASにPOSTリクエストを送信
    const data = new URLSearchParams();
    data.append('lineId', lineId);
    data.append('name', name);
    data.append('company', company);

    fetch("https://script.google.com/macros/s/AKfycbxnxX4dGFJHeMPFrJH-AD1M57zFHQlh1ATLlXC7YPoFdfWqHV27sw60EEfCMcxcmNBP2w/exec", { 
        method: "POST",
        mode: 'cors', // CORSを許可
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    })
    .then(response => response.text())  // JSON でなくテキストとして処理
    .then(result => {
        alert("情報が送信されました！");
        document.getElementById("infoForm").reset();
    })
    .catch(error => {
        // CORSエラーの判定
        if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
             console.warn("CORSエラーが発生しましたが、データは送信されています。");
            // CORSエラーを無視して処理を続ける
            //alert("CORSエラーが発生しましたが、データは送信されました。");
            document.getElementById("infoForm").reset();
        } else {
          console.error("予期しないエラー:", error);
       // alert("送信に失敗しました。");
          alert(error);
        }});
}
