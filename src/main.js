import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages } from "./js/pixabay-api";
import { renderGallery, initializeLightbox } from "./js/render-functions";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader-wrapper');
const input = document.querySelector('.search-form input');
const loadMore = document.querySelector('.load-more')

const params = {
	query: '',
	page: 1,
	total: null,
}

form.addEventListener('submit', async (event) => {
	event.preventDefault();

	params.query = event.target.elements.searchQuery.value;
	params.page = 1;

	if (!params.query) {
		iziToast.warning({
			message: "Please enter a search query",
			position: "topRight",
	});
		return;
	}

	gallery.innerHTML = '';
	showElement(loader);
	input.classList.add('active');


  try {
		const { result, totalHits } = await fetchImages(params.query, params.page);

		if (result.length === 0) {
			iziToast.info({
				message: "Sorry, there are no images matching your search query",
				position: "topRight",
		});
			return;
		}

		const markup = renderGallery(result);
		gallery.innerHTML = markup;
		params.total = totalHits;

		initializeLightbox();
		checkBtnLoadMoreStatus();

	} catch (error) {
		iziToast.error({
			title: "Error",
			message: "Something went wrong. Please try again later.",
			position: "topRight",
	});
		console.error('Error', error);
	} finally {
		form.searchQuery.value = '';
		hideElement(loader);
		input.classList.remove('active');
	}
});

loadMore.addEventListener('click', async (event) => {
	showElement(loader);
	try {
	params.page += 1;
	checkBtnLoadMoreStatus();
	const { result } = await fetchImages(params.query, params.page);
	const markup = renderGallery(result);
	gallery.insertAdjacentHTML('beforeend', markup);

	initializeLightbox();

	} catch (error) {
		iziToast.error({
			title: "Error",
			message: "Something went wrong. Please try again later.",
			position: "topRight",
	});
		console.error('Error', error);
	} finally {
		hideElement(loader);
	}
})

function checkBtnLoadMoreStatus() {
	const perPage = 40;
	const maxPages = Math.ceil(params.total / perPage)
	if (params.page >= maxPages) {
		hideElement(loadMore);
		iziToast.info({
			message: "We're sorry, but you've reached the end of search results.",
			position: "topRight",
		})
	} else {
		showElement(loadMore);
	}
}
function showElement(e) {
	e.classList.remove('hidden');
}
function hideElement(e) {
	e.classList.add('hidden');
}