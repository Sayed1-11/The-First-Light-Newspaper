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
    ${news
        .slice(1, 3)
        .map((item) => {
          const imgSrc =
            item.images && item.images.length > 0
              ? item.images[0]
              : "https://via.placeholder.com/150x100?text=No+Image";

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
        })
        .join("")}
</div>
` +
      `
<div class='middle-side-by-side'>
    ${news
        .slice(3, 6)
        .map((item) => {
          const imgSrc =
            item.images && item.images.length > 0
              ? item.images[0]
              : "https://via.placeholder.com/150x100?text=No+Image";

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
        })
        .join("")}
</div>
`;
  });

fetch("Assets/business.json")
  .then((response) => response.json())
  .then((data) => {
    const news = data;
    document.getElementById("right-news").innerHTML = news
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
      .join("");
  });

// Load New Sports Section
fetch("Assets/sports.json")
  .then((response) => response.json())
  .then((data) => {
    const leftCol = document.querySelector(".sports-left");
    const middleCol = document.querySelector(".sports-middle");
    const rightCol = document.querySelector(".sports-right");

    if (leftCol && data.length > 0) {
      const item = data[0];
      const imgSrc =
        item.images && item.images.length > 0
          ? item.images[0]
          : "https://via.placeholder.com/400x250";
      leftCol.innerHTML = `
                <div class="sports-card-large">
                    <a href="details.html?id=${item.id}" class="news-link">
                        <img src="${imgSrc}" alt="${item.title}">
                        <h3>${item.title}</h3>
                        <p>${truncateText(item.description, 20)}</p>
                        <span class="sports-meta">${timeAgo(
        item.pubdate
      )}</span>
                    </a>
                </div>
            `;
    }

    if (middleCol && data.length > 1) {
      const item = data[1];
      const imgSrc =
        item.images && item.images.length > 0
          ? item.images[0]
          : "https://via.placeholder.com/400x250";
      middleCol.innerHTML = `
                <div class="sports-card-large">
                    <a href="details.html?id=${item.id}" class="news-link">
                        <img src="${imgSrc}" alt="${item.title}">
                        <h3>${item.title}</h3>
                        <p>${truncateText(item.description, 20)}</p>
                        <span class="sports-meta">${timeAgo(
        item.pubdate
      )}</span>
                    </a>
                </div>
            `;
    }

    if (rightCol && data.length > 2) {
      const items = data.slice(2, 6);
      rightCol.innerHTML = items
        .map((item) => {
          const imgSrc =
            item.images && item.images.length > 0
              ? item.images[0]
              : "https://via.placeholder.com/100x75";
          return `
                <div class="sports-card-small">
                    <a href="details.html?id=${item.id
            }" class="news-link" style="display:flex; gap:15px; align-items:center;">
                        <img src="${imgSrc}" alt="${item.title}">
                        <div>
                            <h4>${item.title}</h4>
                            <span class="sports-meta">${timeAgo(
              item.pubdate
            )}</span>
                        </div>
                    </a>
                </div>
                `;
        })
        .join("");
    }
  });

fetch("Assets/technology.json")
  .then((response) => response.json())
  .then((data) => {
    const leftCol = document.querySelector(".technology-left");
    const middleCol = document.querySelector(".technology-middle");
    const rightCol = document.querySelector(".technology-right");

    if (leftCol && data.length > 0) {
      const item = data[0];
      const imgSrc =
        item.images && item.images.length > 0
          ? item.images[0]
          : "https://via.placeholder.com/400x250";
      leftCol.innerHTML = `
                <div class="technology-card-large">
                    <a href="details.html?id=${item.id}" class="news-link">
                        <img src="${imgSrc}" alt="${item.title}">
                        <h3>${item.title}</h3>
                        <p>${truncateText(item.description, 20)}</p>
                        <span class="sports-meta">${timeAgo(
        item.pubdate
      )}</span>
                    </a>
                </div>
            `;
    }

    if (middleCol && data.length > 1) {
      const item = data[1];
      const imgSrc =
        item.images && item.images.length > 0
          ? item.images[0]
          : "https://via.placeholder.com/400x250";
      middleCol.innerHTML = `
                <div class="technology-card-large">
                    <a href="details.html?id=${item.id}" class="news-link">
                        <div class="image-title-middle-extra">
                            <img src="${imgSrc}" alt="${item.title}">
                            <h3>${item.title}</h3>
                        </div>
                        <p>${truncateText(item.description, 15)}</p>
                        <span class="sports-meta">${timeAgo(
        item.pubdate
      )}</span>
                    </a>
                </div>
            `;
    }

    if (rightCol && data.length > 2) {
      const items = data.slice(2, 6);
      rightCol.innerHTML = items
        .map((item) => {
          const imgSrc =
            item.images && item.images.length > 0
              ? item.images[0]
              : "https://via.placeholder.com/100x75";
          return `
                <div class="technology-card-small">
                    <a href="details.html?id=${item.id}" class="news-link">
                        <img src="${imgSrc}" alt="${item.title}">
                        <div>
                            <h4>${item.title}</h4>
                            <span class="sports-meta">${timeAgo(
            item.pubdate
          )}</span>
                        </div>
                    </a>
                </div>
                `;
        })
        .join("");
    }
  })
  .catch((error) => console.error("Error loading technology data:", error));

fetch("Assets/entertainment.json")
  .then((response) => response.json())
  .then((data) => {
    const leftCol = document.querySelector(".entertainment-left");
    const middleCol = document.querySelector(".entertainment-middle");
    const rightCol = document.querySelector(".entertainment-right");

    if (leftCol && data.length > 0) {
      const item = data[0];
      const imgSrc =
        item.images && item.images.length > 0
          ? item.images[0]
          : "https://via.placeholder.com/400x250";
      leftCol.innerHTML = `
                <div class="entertainment-card-large">
                    <a href="details.html?id=${item.id}" class="news-link">
                        <img src="${imgSrc}" alt="${item.title}">
                        <h3>${item.title}</h3>
                        <p>${truncateText(item.description, 20)}</p>
                        <span class="sports-meta">${timeAgo(
        item.pubdate
      )}</span>
                    </a>
                </div>
            `;
    }

    if (rightCol && data.length > 2) {
      rightCol.innerHTML = `
    ${data
          .slice(3, 6)
          .map((item) => {
            const imgSrc =
              item.images && item.images.length > 0
                ? item.images[0]
                : "https://via.placeholder.com/150x100?text=No+Image";

            return `
        <div class='technology-card-small'>
            <a class='news-link' href="details.html?id=${item.id}">
            <img src="${imgSrc}" alt="${item.title}">
           <div>
                            <h4>${item.title}</h4>
                            <span class="sports-meta">${timeAgo(
              item.pubdate
            )}</span>
                        </div>
            </a>
        </div>`;
          })
          .join("")}
`;
    }
  })
  .catch((error) => {
    console.error("Error loading entertainment data:", error);
  });

fetch("Assets/health.json")
  .then((response) => response.json())
  .then((data) => {
    const leftCol = document.querySelector(".health-left");
    const middleCol = document.querySelector(".health-middle");
    const rightCol = document.querySelector(".health-right");

    if (leftCol && data.length > 0) {
      const item = data[0];
      const imgSrc =
        item.images && item.images.length > 0
          ? item.images[0]
          : "https://via.placeholder.com/400x250";
      leftCol.innerHTML = `
                <div class="health-card-large">
                    <a href="details.html?id=${item.id}" class="news-link">
                        <img src="${imgSrc}" alt="${item.title}">
                        <h3>${item.title}</h3>
                        <p>${truncateText(item.description, 20)}</p>
                        <span class="sports-meta">${timeAgo(
        item.pubdate
      )}</span>
                    </a>
                </div>
            `;
    }

    if (rightCol && data.length > 2) {
      rightCol.innerHTML = `
<div class='health-card-small'>
    ${data
          .slice(1, 5)
          .map((item) => {
            const imgSrc =
              item.images && item.images.length > 0
                ? item.images[0]
                : "https://via.placeholder.com/150x100?text=No+Image";

            return `
                <div class='health-card'>
                <a class='news-link' href="details.html?id=${item.id}">
        <div class='health-title'>
            <img src="${imgSrc}" alt="${item.title}">
               </div>
            <h3>${item.title}</h3>
            <p>${truncateText(item.description, 10)}</p>
            
         
            <p>${timeAgo(item.pubdate)}</p>
            </a>
        </div>`;
          })
          .join("")}
</div>
`;
    }
  })
  .catch((error) => {
    console.error("Error loading health data:", error);
  });
// Carousel state
let currentSlide = 0;
let slidesPerView = 3;
let videoData = [];

window.onload = function () {
  console.log("Window loaded, initializing carousel...");
  loadVideos();
};

function loadVideos() {
  console.log("Loading videos from JSON...");

  const carousel = document.getElementById("videos-carresol");
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
      console.error("Error loading videos:", error);
      showError(error.message);
    });
}

function displayCarousel() {
  console.log("Displaying carousel...");

  const carousel = document.getElementById("videos-carresol");
  const indicators = document.getElementById("carousel-indicators");

  if (!carousel) {
    console.error("❌ ERROR: Element #videos-carresol not found!");
    return;
  }

  if (videoData.length === 0) {
    carousel.innerHTML = '<div class="error-message">No videos found</div>';
    return;
  }

  carousel.innerHTML = "";
  if (indicators) indicators.innerHTML = "";

  videoData.forEach((video, index) => {
    const videoCard = document.createElement("div");
    videoCard.className = "video-card";
    videoCard.dataset.index = index;

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
  });

  console.log(`Created ${videoData.length} video cards`);
  updateCarousel();
}

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return dateString;
  }
}

function createIndicators(totalPages) {
  const indicators = document.getElementById("carousel-indicators");
  if (!indicators) return;

  if (indicators.childElementCount === totalPages) return;

  indicators.innerHTML = "";
  for (let i = 0; i < totalPages; i++) {
    const indicator = document.createElement("div");
    indicator.className = "indicator";
    indicator.dataset.slide = i;
    indicator.addEventListener("click", () => {
      goToSlide(i);
    });
    indicators.appendChild(indicator);
  }
  updateIndicators();
}

function updateCarousel() {
  const carousel = document.getElementById("videos-carresol");
  if (!carousel) return;

  if (window.innerWidth <= 768) {
    slidesPerView = 1;
  } else if (window.innerWidth <= 1100) {
    slidesPerView = 2;
  } else if (window.innerWidth <= 1300) {
    slidesPerView = 3;
  } else {
    slidesPerView = 4;
  }

  const totalPages = Math.ceil(videoData.length / slidesPerView);
  createIndicators(totalPages);

  if (currentSlide >= totalPages) currentSlide = totalPages - 1;
  if (currentSlide < 0) currentSlide = 0;

  // Calculate scroll amount dynamically based on actual card size
  const firstCard = carousel.querySelector(".video-card");
  if (firstCard) {
    const cardWidth = firstCard.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(carousel).gap) || 20;
    const scrollPx = (cardWidth + gap) * slidesPerView * currentSlide;
    carousel.style.transform = `translateX(-${scrollPx}px)`;
  } else {
    // Fallback if no cards rendered yet
    const scrollAmount = 100 * currentSlide;
    carousel.style.transform = `translateX(-${scrollAmount}%)`;
  }

  updateIndicators();

  console.log(`Slide ${currentSlide + 1} of ${totalPages}`);
}

function updateIndicators() {
  const indicators = document.querySelectorAll(".indicator");

  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
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
  console.log("Setting up carousel controls...");

  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");

  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
  } else {
    console.warn("Next button not found");
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide);
  } else {
    console.warn("Prev button not found");
  }

  window.addEventListener("resize", updateCarousel);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });
}

function showError(message) {
  const carousel = document.getElementById("videos-carresol");
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

// Tab Switching Function
function openTab(evt, tabId) {
  const tabContainer = evt.currentTarget.closest(".tabs-container");
  const tabContents = tabContainer.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
    tabContents[i].classList.remove("active");
  }

  const tabBtns = tabContainer.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabBtns.length; i++) {
    tabBtns[i].className = tabBtns[i].className.replace(" active", "");
  }

  document.getElementById(tabId).style.display = "block";
  evt.currentTarget.className += " active";
}
window.openTab = openTab;

// Load Business Section
fetch("Assets/business.json")
  .then((response) => response.json())
  .then((data) => {
    // Populate Business Middle and Right (Standard Grid)
    const middleCol = document.querySelector(".business-middle");
    const rightCol = document.querySelector(".business-right");

    if (middleCol && data.length > 0) {
      const items = data.slice(0, 2);
      middleCol.innerHTML = items
        .map((item) => {
          const imgSrc =
            item.images && item.images.length > 0
              ? item.images[0]
              : "https://via.placeholder.com/300x200";
          return `
               <div class="health-title">
                   <a href="details.html?id=${item.id}" class="news-link">
                       <img src="${imgSrc}" style="width:100%; height:250px; object-fit:cover; border-radius:8px; margin-bottom:10px;">
                       <h3>${item.title}</h3>
                       <p>${truncateText(item.description, 20)}</p>
                       <span class="video-date">${timeAgo(item.pubdate)}</span>
                   </a>
               </div>
           `;
        })
        .join("");
    }

    if (rightCol && data.length > 1) {
      // List of smaller items
      const items = data.slice(2, 8);
      rightCol.innerHTML = items
        .map(
          (item) => `
                <div class="news-item" style="display:flex; gap:10px; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                     <img src="${item.images[0]
            }" style="width:80px; height:60px; object-fit:cover; border-radius:4px;">
                     <div>
                         <h4 style="font-size:0.9rem; margin-bottom:5px;">${item.title
            }</h4>
                         <span style="font-size:0.75rem; color:#888;">${timeAgo(
              item.pubdate
            )}</span>
                     </div>
                </div>
            `
        )
        .join("");
    }
  })
  .catch((error) => console.error("Error loading business section:", error));

// Load data for 'Latest' Tab
fetch("Assets/latest.json")
  .then((response) => response.json())
  .then((data) => {
    const latestTab = document.getElementById("bus-latest");
    if (latestTab && data.length > 0) {
      latestTab.innerHTML = data
        .slice(0, 7)
        .map(
          (item) => `
                <div class="news-item" style="margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                    <a href="details.html?id=${item.id}" class="news-link">
                        <h4 style="font-size:1rem; font-weight:600; margin-bottom:5px;">${item.title
            }</h4>
                        <span class="video-date" style="font-size:0.8rem; color:#888;">${timeAgo(
              item.pubdate
            )}</span>
                    </a>
                </div>
            `
        )
        .join("");
    }
  })
  .catch((error) => {
    console.error("Error loading latest data:", error);
    // Fallback or empty state if file not found
    const latestTab = document.getElementById("bus-latest");
    if (latestTab) latestTab.innerHTML = "<p>No latest news available.</p>";
  });

// Load data for 'Market' Tab (using National data as requested)
fetch("Assets/national.json")
  .then((response) => response.json())
  .then((data) => {
    const marketTab = document.getElementById("bus-market");
    if (marketTab && data.length > 0) {
      marketTab.innerHTML = data
        .slice(0, 7)
        .map(
          (item) => `
                <div class="news-item" style="margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                     <a href="details.html?id=${item.id}" class="news-link">
                        <h4 style="font-size:1rem; font-weight:600; margin-bottom:5px;">${item.title
            }</h4>
                         <span class="video-date" style="font-size:0.8rem; color:#888;">${timeAgo(
              item.pubdate
            )}</span>
                     </a>
                </div>
            `
        )
        .join("");
    }
  })
  .catch((error) => {
    console.error("Error loading national data:", error);
    const marketTab = document.getElementById("bus-market");
    if (marketTab) marketTab.innerHTML = "<p>No national news available.</p>";
  });

// Load National Section (5 Flex Cards)
fetch("Assets/national.json")
  .then((response) => response.json())
  .then((data) => {
    const nationalContainer = document.querySelector(".national-container");
    if (nationalContainer && data.length > 0) {
      const items = data.slice(0, 5);
      nationalContainer.innerHTML = items
        .map((item) => {
          const imgSrc =
            item.images && item.images.length > 0
              ? item.images[0]
              : "https://via.placeholder.com/300x200";
          return `
                <div class="national-card">
                    <a href="details.html?id=${item.id}" class="news-link">
                        <img src="${imgSrc}" alt="${item.title}">
                        <h3>${item.title}</h3>
                        <p>${truncateText(item.description, 15)}</p>
                        <span class="video-date">${timeAgo(item.pubdate)}</span>
                    </a>
                </div>
                `;
        })
        .join("");
    }
  })
  .catch((error) => console.error("Error loading national section:", error));

// Load International Section (5 Flex Cards)
fetch("Assets/international.json")
  .then((response) => response.json())
  .then((data) => {
    const internationalContainer = document.querySelector(
      ".international-container"
    );
    if (internationalContainer && data.length > 0) {
      const items = data.slice(0, 6);
      internationalContainer.innerHTML = items
        .map((item) => {
          const imgSrc =
            item.images && item.images.length > 0
              ? item.images[0]
              : "https://via.placeholder.com/300x200";
          return `
                <a href="details.html?id=${item.id}" class="news-link">
                <div class="international-card">
                        <img src="${imgSrc}" alt="${item.title}">
                        <div>
                        <h3>${item.title}</h3>
                        <p>${truncateText(item.description, 100)}</p>
                        <span class="video-date">${timeAgo(item.pubdate)}</span>
                        </div> 
                        </div>
                        </a>
                `;
        })
        .join("");
    }
  })
  .catch((error) =>
    console.error("Error loading international section:", error)
  );

window.loadVideos = loadVideos;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;

// --- Global Search Functionality ---
let globalNewsData = [];
const searchFiles = [
  { file: 'home.json', category: 'Home' },
  { file: 'national.json', category: 'National' },
  { file: 'international.json', category: 'International' },
  { file: 'sports.json', category: 'Sports' },
  { file: 'technology.json', category: 'Technology' },
  { file: 'business.json', category: 'Business' },
  { file: 'entertainment.json', category: 'Entertainment' },
  { file: 'health.json', category: 'Health' },
  { file: 'latest.json', category: 'Latest' }
];

async function loadAllNewsForSearch() {
  try {
    const promises = searchFiles.map(async (searchInfo) => {
      try {
        const response = await fetch(`Assets/${searchInfo.file}`);
        if (!response.ok) return [];
        const data = await response.json();
        return data.map(item => ({ ...item, category: searchInfo.category }));
      } catch (err) {
        console.warn(`Could not load ${searchInfo.file} for search indexing`);
        return [];
      }
    });

    const allDataResults = await Promise.all(promises);
    globalNewsData = allDataResults.flat();
    console.log("Search indexed:", globalNewsData.length, "items");
  } catch (error) {
    console.error("Error indexing news for search:", error);
  }
}

// Initialize search index
loadAllNewsForSearch();

const searchInputInput = document.getElementById('searchInput');
const searchResultsContainer = document.getElementById('searchResults');

if (searchInputInput) {
  searchInputInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query.length < 2) {
      searchResultsContainer.classList.remove('active');
      searchResultsContainer.innerHTML = '';
      return;
    }

    const filteredNews = globalNewsData.filter(item => {
      const title = (item.title || "").toLowerCase();
      const description = (item.description || "").toLowerCase();
      const keywords = Array.isArray(item.keywords) ? item.keywords.map(k => String(k).toLowerCase()) : [];

      return title.includes(query) ||
        description.includes(query) ||
        keywords.some(k => k.includes(query));
    });

    displaySearchResults(filteredNews);
  });

  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
      searchResultsContainer.classList.remove('active');
    }
  });

  // Re-open if clicking back in and has query
  searchInputInput.addEventListener('click', () => {
    if (searchInputInput.value.trim().length >= 2) {
      searchResultsContainer.classList.add('active');
    }
  });

  // Focus input when search button is clicked
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      searchInputInput.focus();
    });
  }
}

function displaySearchResults(results) {
  if (!searchResultsContainer) return;

  searchResultsContainer.innerHTML = '';
  searchResultsContainer.classList.add('active');

  if (results.length === 0) {
    searchResultsContainer.innerHTML = '<div class="no-results">No matches found for "' + searchInputInput.value + '"</div>';
    return;
  }

  // Limit to 8 results for better performance and UI
  results.slice(0, 8).forEach(item => {
    const imgSrc = item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/70x50';
    const resultItem = document.createElement('a');
    resultItem.href = `details.html?id=${item.id}`;
    resultItem.className = 'search-result-item';
    resultItem.innerHTML = `
            <img src="${imgSrc}" alt="${item.title}">
            <div class="search-result-info">
                <span class="category-label">${item.category}</span>
                <h4>${item.title}</h4>
            </div>
        `;
    searchResultsContainer.appendChild(resultItem);
  });
}
