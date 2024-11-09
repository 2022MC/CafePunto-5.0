const usernameInput = document.getElementById('username'); // New field for username
const reviewForm = document.getElementById('reviewForm');
const reviewText = document.getElementById('reviewText');
const ratingValue = document.getElementById('ratingValue');
const reviewsContainer = document.getElementById('reviewsContainer');
const stars = document.querySelectorAll('.star');
const imagesInput = document.getElementById('images');

let selectedImages = []; // Array to store selected images

// Container for image previews
const imagePreviewContainer = document.createElement('div');
imagePreviewContainer.classList.add('image-previews');
reviewForm.insertBefore(imagePreviewContainer, reviewText);

// Function to preview selected images
function previewImages() {
    imagePreviewContainer.innerHTML = ''; // Clear previous previews
    selectedImages = [...imagesInput.files]; // Store selected files

    selectedImages.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('preview-image-container');

            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('preview-image');

            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.innerText = '✕';
            deleteButton.classList.add('delete-image-button');
            deleteButton.onclick = () => removeImage(index);

            imgContainer.appendChild(img);
            imgContainer.appendChild(deleteButton);
            imagePreviewContainer.appendChild(imgContainer);
        };
        reader.readAsDataURL(file);
    });
}

function removeImage(index) {
    selectedImages.splice(index, 1); // Remove image from selectedImages array
    updateFileList(); // Update the FileList in imagesInput
    previewImages(); // Re-render image previews
}

function updateFileList() {
    const dataTransfer = new DataTransfer();
    selectedImages.forEach(file => dataTransfer.items.add(file));
    imagesInput.files = dataTransfer.files; // Update imagesInput with modified file list
}

imagesInput.addEventListener('change', previewImages);

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviewsContainer.innerHTML = '';
    reviews.reverse().forEach((review, index) => addReviewToDOM(review, index)); // Reverse to show newest reviews first
}

function saveReviews(reviews) {
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

function addReviewToDOM(review, index) {
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review');
    
    const imagesHTML = review.images.map(img => `<img src="${img}" alt="Review image">`).join('');
    
    // เพิ่มวันที่ในส่วนของรีวิว
    const dateHTML = `<div class="date"><strong>วันที่โพสต์:</strong> ${review.date}</div>`; // เพิ่มวันที่ที่โพสต์

    reviewDiv.innerHTML = `
        <div class="username"><strong>ผู้ใช้:</strong> ${review.username}</div>
        <div class="text">${review.text}</div>
        <div class="stars">${'★'.repeat(review.rating)}</div>
        <div>${imagesHTML}</div>
        ${dateHTML} <!-- แสดงวันที่ -->
        <div class="actions">
            <button onclick="editReview(${index})">Edit</button>
            <button onclick="deleteReview(${index})">Delete</button>
        </div>
    `;
    
    // Insert the new review at the top of the container
    reviewsContainer.insertBefore(reviewDiv, reviewsContainer.firstChild);

    // Scroll to the top of the reviews container (so user can scroll up)
    reviewsContainer.scrollTop = 0; // เลื่อนไปที่ด้านบนสุดของ reviewsContainer
}

stars.forEach(star => {
    star.addEventListener('click', () => {
        stars.forEach(s => s.classList.remove('selected'));
        star.classList.add('selected');
        ratingValue.value = star.getAttribute('data-value');
    });
});

reviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = usernameInput.value;
    const text = reviewText.value;
    const rating = parseInt(ratingValue.value);
    const images = selectedImages.map(file => URL.createObjectURL(file));

    const usernameError = document.getElementById('usernameError');
    if (!username) {
        usernameError.textContent = "จำเป็นต้องใส่";
    } else {
        usernameError.textContent = ""; // Clear the error message if username is entered
    }

    // เพิ่มการบันทึกวันที่ โดยใช้รูปแบบ 24 ชั่วโมง
    const date = new Date();
    const options = { 
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', 
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false 
    };
    const formattedDate = date.toLocaleString('th-TH', options); // ใช้ 'th-TH' เพื่อให้แสดงในภาษาไทยและใช้รูปแบบ 24 ชั่วโมง

    if (username && text && rating) {
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.unshift({ username, text, rating, images, date: formattedDate }); // Add the formatted date to the review
        saveReviews(reviews);
        loadReviews();
        reviewForm.reset();
        imagePreviewContainer.innerHTML = ''; // Clear image previews
        selectedImages = []; // Clear selected images
        stars.forEach(star => star.classList.remove('selected'));
    }
});

function editReview(index) {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const review = reviews[index];
    usernameInput.value = review.username;
    reviewText.value = review.text;
    ratingValue.value = review.rating;
    stars.forEach(star => star.classList.toggle('selected', star.getAttribute('data-value') == review.rating));
    deleteReview(index);
}

function deleteReview(index) {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.splice(index, 1);
    saveReviews(reviews);
    loadReviews();
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

loadReviews();
