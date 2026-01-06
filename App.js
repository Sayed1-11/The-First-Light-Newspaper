const today = new Date();
document.getElementById("current-date").innerHTML = today.toDateString();

document.getElementById('menuToggle').addEventListener('click', function () {
    document.getElementById('mobileMenu').classList.toggle('active');
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
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + '...';
}

fetch('Assets/home.json')
    .then(response => response.json())
    .then(data => {
        console.log("Fetched data:", data);
        const news = data;
        const imageNews = news.filter(item => item.images && item.images.length > 0);
        const noImageNews = news.filter(item => !item.images || item.images.length === 0);
        const leftCol = document.getElementById('left-news');
        if (leftCol) {
            let leftHTML = '';
            if (imageNews.length > 0) {
                leftHTML += imageNews.slice(0, 3).map(item => {
                    const imgSrc = item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150x100?text=No+Image';
                    return `
                    <div class='news-item'>
                        <a class='news-link' href="${item.link || '#'}">
                            <div class='image-title'>
                                <img src="${imgSrc}" alt="${item.title}">
                                <h2>${item.title}</h2>
                                
                                </div>
                                    <p>${truncateText(item.description, 10)}</p>
                                    <p>${timeAgo(item.pubdate)}</p>
                            </div>
                        </a>
                    </div>`;
                }).join('');
            }

            // Next 3 no-image news
            if (noImageNews.length > 0) {
                leftHTML += noImageNews.slice(0, 3).map(item => `
                    <div class='news-item'>
                        <a class='news-link' href="${item.link || '#'}">
                            <div class='image-title'>
                                <div>
                                    <h2>${item.title}</h2>
                                    <p>${truncateText(item.description, 10)}</p>
                                    <p>${timeAgo(item.pubdate)}</p>
                                </div>
                            </div>
                        </a>
                    </div>`).join('');
            }

            leftCol.innerHTML = leftHTML;
        }

        const middleCol = document.getElementById('middle-news');
        if (middleCol) {
            let middleHTML = '';
            if (imageNews.length > 6) {
                const featuredItem = imageNews[6];
                middleHTML += `
                <div class='news-item-middle'>
                    <a class='news-link' href="${featuredItem.link || '#'}">
                        <div class='image-title-middle'>
                            <img src="${featuredItem.images[0]}" alt="${featuredItem.title}">
                            <h3>${featuredItem.title}</h3>
                            </div>
                                <p>${truncateText(featuredItem.description, 15)}</p>
                                <p>${timeAgo(featuredItem.pubdate)}</p>
                           
                       
                    </a>
                </div>`;
            }

            // Side-by-side news (indices 7 and 8 from imageNews)
            if (imageNews.length > 8) {
                middleHTML += `
                <div class='middle-side-by-side'>
                    ${imageNews.slice(7, 9).map(item => `
                    <div class='news-item-middle-s'>
                        <a class='news-link' href="${item.link || '#'}">
                            <div class='image-title-middle-small'>
                                <img src="${item.images[0]}" alt="${item.title}">
                                <div>
                                    <h2>${item.title}</h2>
                                    <p>${truncateText(item.description, 8)}</p>
                                    <p>${timeAgo(item.pubdate)}</p>
                                </div>
                            </div>
                        </a>
                    </div>`).join('')}
                </div>`;
            }

            middleCol.innerHTML = middleHTML;
        }

        const rightCol = document.getElementById('right-news');
        if (rightCol) {

            const startIndex = 9;
            const rightNews = imageNews.slice(startIndex, startIndex + 3);
            const remainingNoImageNews = noImageNews.slice(3, 6);

            let rightHTML = '';

            // Image news
            if (rightNews.length > 0) {
                rightHTML += rightNews.map(item => `
                <div class='news-item'>
                    <a class='news-link' href="${item.link || '#'}">
                        <div class='image-title'>
                            <img src="${item.images[0]}" alt="${item.title}">
                            <div>
                                <h2>${item.title}</h2>
                                <p>${truncateText(item.description, 10)}</p>
                                <p>${timeAgo(item.pubdate)}</p>
                            </div>
                        </div>
                    </a>
                </div>`).join('');
            }

            // No-image news
            if (remainingNoImageNews.length > 0) {
                rightHTML += remainingNoImageNews.map(item => `
                <div class='news-item'>
                    <a class='news-link' href="${item.link || '#'}">
                        <div class='image-title'>
                            <div>
                                <h2>${item.title}</h2>
                                <p>${truncateText(item.description, 10)}</p>
                                <p>${timeAgo(item.pubdate)}</p>
                            </div>
                        </div>
                    </a>
                </div>`).join('');
            }

            rightCol.innerHTML = rightHTML;
        }

        // Add click handlers for all news links
        document.querySelectorAll('.news-link').forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') {
                    e.preventDefault();
                    alert('This is a demo link. In a real application, this would navigate to the full article.');
                }
            });
        });

    })
    .catch(error => {
        console.error('Error loading news:', error);
        // Show error message
        document.getElementById('left-news').innerHTML = '<p class="error">Failed to load news. Please try again later.</p>';
        document.getElementById('middle-news').innerHTML = '';
        document.getElementById('right-news').innerHTML = '';
    });

// Add error styling
const style = document.createElement('style');
style.textContent = `
    .error {
        color: #c00;
        text-align: center;
        padding: 20px;
        font-size: 1.1rem;
    }
    
    /* Ensure images don't break layout */
    .image-title img {
        max-width: 100%;
        height: auto;
    }
    
    /* Fix for news-item-middle-s */
    .news-item-middle-s {
        margin-bottom: 20px;
    }
    
    .image-title-middle-small {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .image-title-middle-small img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 4px;
    }
    
    .image-title-middle-text h2 {
        font-size: 1.2rem;
        margin-bottom: 10px;
    }
    
    .image-title-middle-text p {
        margin-bottom: 5px;
    }
`;
document.head.appendChild(style);