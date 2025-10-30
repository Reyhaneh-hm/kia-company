// search box
(function () {
    const form = document.querySelector('.search');
    const input = form.querySelector('.search-input');
    const searchBtn = form.querySelector('.search-btn');
    const closeBtn = form.querySelector('.search-close');
    const suggestionsEl = form.querySelector('.suggestions');

    const cars = [
        'Toyota Corolla', 'Toyota Camry', 'Honda Civic', 'Honda Accord',
        'BMW 3 Series', 'BMW X5', 'Mercedes A-Class', 'Mercedes C-Class',
        'Audi A4', 'Audi Q5', 'Hyundai Elantra', 'Kia Rio', 'Mazda 3',
        'Nissan Altima', 'Porsche 911', 'Tesla Model 3', 'Renault Clio'
    ];

    let clickedInsideSuggestions = false;

    function openSearch() {
        form.classList.add('active');
        input.focus();
        renderSuggestions();
    }

    function closeSearch() {
        form.classList.remove('active');
        input.value = '';
        renderSuggestions([]);
    }

    form.addEventListener('click', function (e) {
        if (e.target.closest('.suggestions li')) return;
        if (!form.classList.contains('active')) {
            e.preventDefault();
            openSearch();
        }
    });

    closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeSearch();
    });
    suggestionsEl.addEventListener('mousedown', function (e) {
        const li = e.target.closest('li');
        if (!li) return;
        clickedInsideSuggestions = true;

        input.value = li.dataset.value;
        renderSuggestions([]);

        setTimeout(() => {
            input.focus();
        }, 0);
    });

    input.addEventListener('input', function () {
        const q = input.value.trim().toLowerCase();
        if (!q) {
            renderSuggestions([]);
            return;
        }
        const filtered = cars.filter(c => c.toLowerCase().includes(q));
        renderSuggestions(filtered);
    });

    function renderSuggestions(list = []) {
        suggestionsEl.innerHTML = '';
        if (!list || list.length === 0) {
            suggestionsEl.style.display = 'none';
            return;
        }
        suggestionsEl.style.display = 'block';
        const frag = document.createDocumentFragment();
        list.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            li.setAttribute('role', 'option');
            li.dataset.value = item;
            frag.appendChild(li);
        });
        suggestionsEl.appendChild(frag);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const query = input.value.trim();
        if (!query) {
            closeSearch();
            return;
        }

        const action = form.getAttribute('action') || '/search';
        const method = (form.getAttribute('method') || 'GET').toUpperCase();

        const url = (method === 'GET') ? `${action}?q=${encodeURIComponent(query)}` : action;
        const fetchOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' }
        };
        if (method !== 'GET') {
            fetchOptions.body = JSON.stringify({ q: query });
        }

        fetch(url, fetchOptions)
            .then(resp => resp.ok ? resp : Promise.resolve(resp))
            .catch(err => {
                console.warn('search fetch error (might be fine in dev):', err);
            })
            .finally(() => {
                form.classList.remove('active');
                renderSuggestions([]);
                setTimeout(() => {
                    input.value = '';
                }, 300);
            });
    });

    document.addEventListener('mousedown', function (e) {
        if (clickedInsideSuggestions) {
            clickedInsideSuggestions = false;
            return;
        }

        if (!form.contains(e.target)) {
            closeSearch();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeSearch();
        }
    });

    renderSuggestions([]);
})();



// sub menu
const brandItem = document.querySelector('#item');
const submenu = document.querySelector('.submenu');
const arrowIcon = document.querySelector('#arrow_down');
const closeBtn = document.querySelector('#icon_close');
const rightItems = document.querySelectorAll('.right .item');

brandItem.addEventListener('click', (e) => {
    e.preventDefault();
    submenu.classList.toggle('active');
    arrowIcon.classList.toggle('rotated');
});

closeBtn.addEventListener('click', () => {
    submenu.classList.remove('active');
    arrowIcon.classList.remove('rotated');
});

rightItems.forEach((item) => {
    item.addEventListener('click', () => {
        rightItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});
