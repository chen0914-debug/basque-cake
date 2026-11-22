// Shared nav + reveal + modals
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const navlinks = document.getElementById('navlinks');
  if (menuBtn && navlinks) {
    menuBtn.addEventListener('click', () => navlinks.classList.toggle('open'));
    navlinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navlinks.classList.remove('open'))
    );
  }

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Product detail modal (menu page)
  const products = {
    original: {
      name: '經典原味',
      en: 'Classic Basque',
      price: '6吋 NT$ 500｜切片 NT$ 89',
      text: '以濃郁乳酪風味為主角，搭配深色烘焙表層與柔滑內餡。6 吋整顆 NT$500，切片 NT$89。優惠僅限 6 吋：北護學生 −$10、當月壽星 −$50。',
    },
    blueberry: {
      name: '藍莓果香',
      en: 'Blueberry Basque',
      price: '6吋 NT$ 550｜切片 NT$ 99',
      text: '以藍莓果香搭配乳酪的濃郁感，呈現果香與奶香的平衡。6 吋整顆 NT$550，切片 NT$99。優惠僅限 6 吋：北護學生 −$10、當月壽星 −$50。',
    },
  };

  const modal = document.getElementById('modal');
  const toast = document.getElementById('toast');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function openProduct(id) {
    if (id === 'pricelist') {
      const imgModal = document.getElementById('imgModal');
      if (imgModal) imgModal.classList.add('open');
      return;
    }
    const p = products[id];
    if (!p || !modal) return;
    document.getElementById('modalEyebrow').textContent = p.en.toUpperCase() + ' · ' + p.price;
    document.getElementById('modalTitle').textContent = p.name;
    document.getElementById('modalText').innerHTML = p.text;
    modal.classList.add('open');
  }

  function closeModal() {
    if (modal) modal.classList.remove('open');
  }

  function closeImgModal() {
    const imgModal = document.getElementById('imgModal');
    if (imgModal) imgModal.classList.remove('open');
  }

  document.querySelectorAll('.details').forEach((b) =>
    b.addEventListener('click', () => openProduct(b.dataset.product))
  );

  const closeModalBtn = document.getElementById('closeModal');
  const closeCta = document.getElementById('closeCta');
  if (closeModalBtn) closeModalBtn.onclick = closeModal;
  if (closeCta) closeCta.onclick = closeModal;
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  const closeImgBtn = document.getElementById('closeImgModal');
  const imgModal = document.getElementById('imgModal');
  if (closeImgBtn) closeImgBtn.onclick = closeImgModal;
  if (imgModal) {
    imgModal.addEventListener('click', (e) => {
      if (e.target === imgModal) closeImgModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeImgModal();
    }
  });

  // Film storyboard modal
  const filmBtn = document.getElementById('filmBtn');
  if (filmBtn && modal) {
    filmBtn.onclick = () => {
      document.getElementById('modalEyebrow').textContent = 'BASQUE MOMENT · 15 SEC';
      document.getElementById('modalTitle').textContent = '焦香的一刻';
      document.getElementById('modalText').innerHTML =
        '00–04 秒：焦黑表層在暖光下微微反光，呈現巴斯克標誌性的「燒焦」之美。<br>' +
        '04–08 秒：刀切入蛋糕，露出柔軟、微顫的乳酪內餡。<br>' +
        '08–12 秒：切片放上盤中，焦香與乳香交織的細節特寫。<br>' +
        '12–15 秒：品牌字標與標語淡入——焦香之外，是柔軟的本質。';
      const addBtn = document.getElementById('addBtn');
      if (addBtn) addBtn.style.display = 'none';
      modal.classList.add('open');
    };
  }

  const addBtn = document.getElementById('addBtn');
  if (addBtn) {
    addBtn.onclick = () => {
      closeModal();
      showToast('正式訂購請前往「訂購」頁面填寫表單');
    };
  }
})();
