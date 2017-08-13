export function setStyle(newStyle) {
	return {
		type: "SET_STYLE",
		payload:{opacity:"1", transition: "1s all ease"}
	}
}
export function unsetStyle(newStyle) {
	return {
		type: "UNSET_STYLE",
		payload:{opacity:"0.3", transition: "1s all ease"}
	}
}
export function startPage() {
	return {
		type: "START_PAGE",
		payload: {start: 1}
	}
}
export function incrementPage(length) {
	return {
		type: "INCREMENT_PAGE",
		payload: {for: 1, length: length}
	}
}
export function decrementPage() {
	return {
		type: "DECREMENT_PAGE",
		payload: 1
	}
}
export function updateSearch(word){
	return {
		type: "SEARCH",
		payload: word.target.value
	}
}
export function updateTagSearch(word){
	return {
		type: "SEARCH_TAG",
		payload: word.target.value
	}
}
export function updateTutorialSearch(word){
	return {
		type: "SEARCH_TUTORIAL",
		payload: word.target.value
	}
}