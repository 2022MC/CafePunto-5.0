// รหัสผ่านที่ถูกต้อง
const validPasswords = ["PuntoCafe", "12345"];

// ฟังก์ชันตรวจสอบรหัสผ่าน
document.getElementById("profileForm").addEventListener("submit", function (event) {
  event.preventDefault(); // ป้องกันการ reload หน้าเมื่อ submit

  const inputPassword = document.getElementById("password").value;
  const inputUsername = document.getElementById("username").value;
  const profilePicInput = document.getElementById("profile-pic-input");  // แก้ไขตรงนี้
  const errorMessage = document.getElementById("error-message");

  if (validPasswords.includes(inputPassword)) {
    console.log("รหัสผ่านถูกต้อง กำลังเปลี่ยนหน้า...");
    
    // เก็บข้อมูล username ใน localStorage
    localStorage.setItem("username", inputUsername);

    // ถ้ามีการอัพโหลดรูป ให้บันทึก URL ของรูปใน localStorage
    if (profilePicInput.files[0]) {
      const file = profilePicInput.files[0];
      const reader = new FileReader();
      reader.onloadend = function () {
        localStorage.setItem("profilePic", reader.result);
        redirectToProfile();
      };
      reader.readAsDataURL(file); // อ่านไฟล์เป็น Data URL เพื่อเก็บใน localStorage
    } else {
      redirectToProfile();
    }
  } else {
    // ถ้ารหัสผิด แสดงข้อความแจ้งเตือน
    errorMessage.textContent = "รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง";
    errorMessage.style.display = "block";
  }
});

function redirectToProfile() {
  window.location.href = "login.html"; // เปลี่ยน URL ของหน้าถัดไป
}

function displayProfile() {
  const username = localStorage.getItem("username");
  const profilePic = localStorage.getItem("profilePic");

  if (username) {
    document.getElementById("display-username").textContent = username;
  }
  if (profilePic) {
    document.getElementById("display-profile-pic").src = profilePic;
  }
}

function loadProfilePic(event) {
  const profilePic = document.getElementById("display-profile-pic");
  profilePic.src = URL.createObjectURL(event.target.files[0]);
}

function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('show');
}
