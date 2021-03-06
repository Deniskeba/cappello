let tabs = document.querySelectorAll('.catalog__tab');
let contents = document.querySelectorAll('.catalog__content');
let orderBtn = document.querySelector('.order__btn');
let catalogBtn = document.querySelectorAll('.catalog_btn');
let modal = document.getElementById('modal');
let modalContent = document.querySelector('.modal_content');
let modalBtn = document.querySelector('.modal_button');
let stockBtn = document.querySelector('.header_stock');
let orderBtnHeader = document.querySelector('.header_order');
let catalog = document.getElementById('catalog');
let order = document.getElementById('order');
let forms = document.querySelectorAll('.modal-form');

const message = {
  loading: 'Загрузка',
  success: 'Спаксибо! Мы скоро с вами свзяжемся :)',
  failure: 'Что-то пошло не так :('
};

forms.forEach(item => {
  post(item);
});

function post(form){
  form.addEventListener('submit', (e) =>{
    e.preventDefault();

    let r = new XMLHttpRequest();
    r.open('POST', 'server.php');
    const formData = new FormData(form);

    r.send(formData);
    r.addEventListener('load', () => {
      console.log(r.response);
      form.reset();
      showThanksModal(message);



    });
  });

}

function showThanksModal(message) {
  const prevModalDialog = document.querySelector('.modal_dialog');
  prevModalDialog.classList.add('hide');
  prevModalDialog.classList.remove('show');
  openModal();

  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal_dialog');
  thanksModal.innerHTML = `
  <div class="modal_content">
   <span data-close class="modal_close">&times;</span>
   <div class="modal_subtitle">${message.success}</div>
   </div>
  `;
  document.querySelector('.modal').append(thanksModal);
  setTimeout(() => {
  thanksModal.remove();
  prevModalDialog.classList.add('show');
  prevModalDialog.classList.remove('hide');
  closeModal();
  }, 4000);
}

catalogBtn.forEach((item) =>{
item.addEventListener('click', openModal);});


//молальное окно консультация 
orderBtn.addEventListener('click', openModal);


function openModal() {
  modal.classList.add('modal_active');
  document.body.style.overflow = 'hidden';
}

//функция закрыть модалку
function closeModal(){
  modal.classList.remove('modal_active');
  document.body.style.overflow = '';
}

//закрыть модалку
modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.getAttribute('data-close') == ''){closeModal();}
});



    tabs.forEach((item) => {
        item.addEventListener('click', (e) => {
            const id = item.getAttribute('data-tab');
          



            tabs.forEach(function (item) {
              item.classList.remove('catalog__tab_active');
            });
            contents.forEach(function (item) {
              item.classList.remove('catalog__content_active');
            });


            item.classList.add('catalog__tab_active');
            document.getElementById(id).classList.add('catalog__content_active');
          });
      });

function scrollTo(element) {
  window.scroll({
    left: 0,
    top: element.offsetTop,
    behavior: "smooth"
  });
}

stockBtn.addEventListener('click', () => {
  scrollTo(catalog);
});



orderBtnHeader.addEventListener('click', () => {
  scrollTo(order);
});

