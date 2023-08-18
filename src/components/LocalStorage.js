// Save tasting data to local storage for a specific beer ID
export const saveTastingData = (beerId, tastingData) => {
    try {
        const key = `btapp-${beerId}`;
        localStorage.setItem(key, JSON.stringify({beerId: beerId, tastingResults: tastingData}));
    } catch (error) {
        console.error('Error saving tasting data to local storage:', error);
    }
};

// Load tasting data from local storage for a specific beer ID
export const loadTastingData = (beerId) => {
    try {
        const key = `btapp-${beerId}`;
        const tastingData = localStorage.getItem(key);
        return tastingData ? JSON.parse(tastingData) : null;
    } catch (error) {
        console.error('Error loading tasting data from local storage:', error);
        return null;
    }
};

export const saveLikedData = (beerId) => {
    try {
        const key = `btapplike-${beerId}`;
        localStorage.setItem(key, JSON.stringify({liked: true}));
    } catch (error) {
        console.error('Error saving tasting data to local storage:', error);
    }
};

// Load tasting data from local storage for a specific beer ID
export const loadLikedData = (beerId) => {
    try {
        const key = `btapplike-${beerId}`;
        const likedData = localStorage.getItem(key);
        return likedData ? JSON.parse(likedData) : null;
    } catch (error) {
        console.error('Error loading tasting data from local storage:', error);
        return null;
    }
};
