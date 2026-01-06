const today = new Date();
document.getElementById("current-date").innerHTML = today.toDateString();

document.getElementById("menuToggle").addEventListener("click", function () {
  document.getElementById("mobileMenu").classList.toggle("active");
});

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval + (interval === 1 ? " year ago" : " years ago");
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + (interval === 1 ? " month ago" : " months ago");
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + (interval === 1 ? " day ago" : " days ago");
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + (interval === 1 ? " hour ago" : " hours ago");
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + (interval === 1 ? " minute ago" : " minutes ago");
  }
  return Math.floor(seconds) + (seconds === 1 ? " second ago" : " seconds ago");
}

function truncateText(text, limit) {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "...";
}

fetch("Assets/home.json")
  .then((response) => response.json())
  .then((data) => {
    const news = data;
    document.getElementById("left-news").innerHTML =
      news
        .slice(0, 3)
        .map((item) => {
          const imgSrc =
            item.images && item.images.length > 0
              ? item.images[0]
              : "https://via.placeholder.com/150x100?text=No+Image";
          return `
                    <div class='news-item'>
                        <a class='news-link' href="details.html?id=${item.id}">
                            <div class='image-title'>
                            <h2>${item.title}</h2>
                            <img src="${imgSrc}" alt="${item.title}">
                                
                                </div>
                                    <p>${truncateText(item.description, 10)}</p>
                                    <p>${timeAgo(item.pubdate)}</p>
                            </div>
                        </a>
                    </div>`;
        })
        .join("") +
      news
        .slice(3, 6)
        .map(
          (item) => `
                    <div class='news-item'>
                        <a class='news-link' href="details.html?id=${item.id}">
                            <div class='image-title'>
                                <div>
                                    <h2>${item.title}</h2>
                                    <p>${truncateText(item.description, 10)}</p>
                                    <p>${timeAgo(item.pubdate)}</p>
                                </div>
                            </div>
                        </a>
                    </div>`
        )
        .join("");

  

  });


fetch("Assets/sports.json")
  .then((response) => response.json())
  .then((data) => {
    const news = data;
  document.getElementById("middle-news").innerHTML =
      news
        .slice(0, 1)
        .map((item) => {
          const imgSrc =
            item.images && item.images.length > 0
              ? item.images[0]
              : "https://via.placeholder.com/150x100?text=No+Image";
          return `
                    <div class='news-item-middle'>
                        <a class='news-link' href="details.html?id=${item.id}">
                            <div class='image-title-middle'>
                                <img src="${imgSrc}" alt="${item.title}">
                                <h3>${item.title}</h3>
                                </div>
                                    <p>${truncateText(item.description, 10)}</p>
                                    <p>${timeAgo(item.pubdate)}</p>
                            </div>
                        </a>
                    </div>`;
        })
        .join("") +

`
<div class='middle-side-by-side'>
    ${news.slice(1, 3).map(item => {
        const imgSrc = item.images && item.images.length > 0
            ? item.images[0]
            : 'https://via.placeholder.com/150x100?text=No+Image';

        return `
        <div class='news-item-middle-small'>
            <a class='news-link' href="details.html?id=${item.id}">

            <div class='image-title-middle-small'>
            <img src="${imgSrc}" alt="${item.title}">
            <h3>${item.title}</h3>
            </div>
                <p>${truncateText(item.description, 10)}</p>
                <p>${timeAgo(item.pubdate)}</p>
            </a>
        </div>`;
    }).join("")}
</div>
` +
`
<div class='middle-side-by-side'>
    ${news.slice(3, 6).map(item => {
        const imgSrc = item.images && item.images.length > 0
            ? item.images[0]
            : 'https://via.placeholder.com/150x100?text=No+Image';

        return `
        <div class='news-item-middle-grid'>
            <a class='news-link' href="details.html?id=${item.id}">

            <div class='image-title-middle-extra'>
            <img src="${imgSrc}" alt="${item.title}">
            <h3>${item.title}</h3>
            </div>
                <p>${truncateText(item.description, 10)}</p>
                <p>${timeAgo(item.pubdate)}</p>
            </a>
        </div>`;
    }).join("")}
</div>
`
;
  });


fetch("Assets/business.json")
  .then((response) => response.json())
  .then((data) => {
    const news = data;
  document.getElementById("right-news").innerHTML =
      news
        .slice(0, 5)
        .map((item) => {
            const imgSrc =
            item.images && item.images.length > 0
              ? item.images[0]
              : "https://via.placeholder.com/150x100?text=No+Image";
          return `
                    <div class='news-item'>
                        <a class='news-link' href="details.html?id=${item.id}">
                            <div class='image-title'>
                            <h3>${item.title}</h3>
                            <img src="${imgSrc}" alt="${item.title}">
                                </div>
                                    <p>${truncateText(item.description, 10)}</p>
                                    <p>${timeAgo(item.pubdate)}</p>
                            </div>
                        </a>
                    </div>`;
        })
        .join("") 
;
  });  
  
  
  
// App.js - Video Carousel
console.log('App.js loaded successfully');

// Carousel state
let currentSlide = 0;
let slidesPerView = 3;
let videoData = [];

// Initialize when page loads
window.onload = function() {
    console.log('Window loaded, initializing carousel...');
    loadVideos();
};

function loadVideos() {
    console.log('Loading videos from JSON...');
    
    // Show loading state
    const carousel = document.getElementById('videos-carresol');
    if (carousel) {
        carousel.innerHTML = '<div class="loading">Loading videos...</div>';
    }
    
    fetch("Assets/videos.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(`Successfully loaded ${data.length} videos`);
            videoData = data;
            displayCarousel();
            setupCarouselControls();
        })
        .catch((error) => {
            console.error('Error loading videos:', error);
            showError(error.message);
        });
}

function displayCarousel() {
    console.log('Displaying carousel...');
    
    const carousel = document.getElementById('videos-carresol');
    const indicators = document.getElementById('carousel-indicators');
    
    // Check if elements exist
    if (!carousel) {
        console.error('❌ ERROR: Element #videos-carresol not found!');
        return;
    }
    
    if (videoData.length === 0) {
        carousel.innerHTML = '<div class="error-message">No videos found</div>';
        return;
    }
    
    // Clear existing content
    carousel.innerHTML = '';
    if (indicators) indicators.innerHTML = '';
    
    // Create video cards
    videoData.forEach((video, index) => {
        // Create video card
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.dataset.index = index;
        
        // Format date safely
        const formattedDate = formatDate(video.pubdate);
        
        videoCard.innerHTML = `
            <img src="${video.image}" alt="${video.title}" class="video-image" loading="lazy">
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-description">${video.description}</p>
                <div class="video-meta">
                    <span class="video-date">${formattedDate}</span>
                    <a href="${video.youtube_link}" target="_blank" rel="noopener noreferrer" class="video-link">Watch</a>
                </div>
            </div>
        `;
        
        carousel.appendChild(videoCard);
        
        // Create indicator if indicators element exists
        if (indicators) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.dataset.slide = index;
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
            indicators.appendChild(indicator);
        }
    });
    
    console.log(`Created ${videoData.length} video cards`);
    updateCarousel();
}

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return dateString; // Return original if invalid
        }
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        return dateString; // Return original if error
    }
}

function updateCarousel() {
    const carousel = document.getElementById('videos-carresol');
    if (!carousel) return;
    
    // Calculate slides per view based on screen width
    if (window.innerWidth <= 768) {
        slidesPerView = 1;
    } else if (window.innerWidth <= 992) {
        slidesPerView = 2;
    } else {
        slidesPerView = 3;
    }
    
    // Calculate scroll position
    const cardWidth = 100 / slidesPerView;
    const scrollAmount = cardWidth * currentSlide;
    carousel.style.transform = `translateX(-${scrollAmount}%)`;
    
    // Update indicators
    updateIndicators();
    
    console.log(`Slide ${currentSlide + 1} of ${Math.ceil(videoData.length / slidesPerView)}`);
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function goToSlide(slideIndex) {
    const totalSlides = Math.ceil(videoData.length / slidesPerView);

    if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    } else if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    
    currentSlide = slideIndex;
    updateCarousel();
}

function nextSlide() {
    const totalSlides = Math.ceil(videoData.length / slidesPerView);
    goToSlide((currentSlide + 1) % totalSlides);
}

function prevSlide() {
    const totalSlides = Math.ceil(videoData.length / slidesPerView);
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
}

function setupCarouselControls() {
    console.log('Setting up carousel controls...');
    
    // Next/Prev button event listeners
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    } else {
        console.warn('Next button not found');
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    } else {
        console.warn('Prev button not found');
    }
    
    // Update on window resize
    window.addEventListener('resize', updateCarousel);
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
    
}

function showError(message) {
    const carousel = document.getElementById('videos-carresol');
    if (carousel) {
        carousel.innerHTML = `
            <div class="error-message">
                <p>⚠️ Error loading videos</p>
                <p><small>${message}</small></p>
                <button onclick="loadVideos()" style="margin-top: 10px; padding: 8px 16px; background: #ff0000; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Retry
                </button>
            </div>
        `;
    }
}

// Make functions available globally for debugging
window.loadVideos = loadVideos;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;