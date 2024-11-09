// ฟังก์ชันสำหรับแสดงโปรไฟล์จาก localStorage
function displayProfile() {
    // ดึงข้อมูลจาก localStorage
    const username = localStorage.getItem("username");
    const profilePic = localStorage.getItem("profilePic");

    // ถ้ามีข้อมูล username ให้แสดงใน console
    if (username) {
        console.log("Username: " + username);
    } else {
        console.log("No username found.");
    }

    // ถ้ามีโปรไฟล์รูปภาพ ให้แสดงรูปโปรไฟล์
    if (profilePic) {
        document.getElementById("display-profile-pic").src = profilePic;
    } else {
        console.log("No profile picture found.");
    }
}

// เรียกฟังก์ชัน displayProfile เมื่อหน้าโหลด
window.onload = displayProfile;

// ฟังก์ชันสำหรับเปิด/ปิดเมนู
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) { // ตรวจสอบว่า navLinks มีอยู่
        navLinks.classList.toggle('show');
    }
}

// ฟังก์ชันสำหรับเปิด/ปิดการมองเห็นรหัสผ่าน
function togglePassword() {
    const passwordField = document.getElementById("passwordField");
    const toggleEye = document.getElementById("toggleEye");
    if (passwordField && toggleEye) {
        if (passwordField.type === "password") {
            passwordField.type = "text";
            toggleEye.textContent = "🙈"; // สัญลักษณ์ปิดตา
        } else {
            passwordField.type = "password";
            toggleEye.textContent = "👁️"; // สัญลักษณ์ตา
        }
    }
}
