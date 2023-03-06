export const displayError = error => {
    const body = document.querySelector('body');
    const errorElement = document.createElement('div');
    errorElement.setAttribute("style", "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999999; background: #fff; color: red; outline: 4px solid red; padding: 2rem; box-shadow: 10px 10px 10px rgba(0,0,0,.3); border-radius: 2rem;");
    errorElement.textContent = error;
    body.appendChild(errorElement);
    throw error;
}