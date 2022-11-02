'use strict';

const TESTS = {
  fullName: {
    regExp: /[a-zA-Zа-яА-ЯІіЇїЄєҐґ]{6} [a-zA-Zа-яА-ЯІіЇїЄєҐґ]\.[a-zA-Zа-яА-ЯІіЇїЄєҐґ]\./,
    length: 11,
  },
  variant: { regExp: /[0-9]{2}/, length: 2 },
  group: { regExp: /[a-zA-Zа-яА-ЯІіЇїЄєҐґ]{2}-[0-9]{2}/, length: 5 },
  phone: { regExp: /\([0-9]{3}\)-[0-9]{3}-[0-9]{2}-[0-9]{2}/, length: 15 },
  idCard: { regExp: /[a-zA-Zа-яА-ЯІіЇїЄєҐґ]{2} №[0-9]{6}/, length: 10 },
};

const LABELS = {
  fullName: 'ПІБ',
  variant: 'Варіант',
  group: 'Група',
  phone: 'Телефон',
  idCard: 'Номер ID-картки',
};

const form = document.querySelector('.form');

const dataSection = document.getElementById('data-section');

dataSection.classList.add('no-display');

form.addEventListener('submit', event => {
  event.preventDefault();

  const fields = {};
  const errors = [];

  for (const { tagName, id, value } of form.elements) {
    if (tagName === 'INPUT') {
      const element = document.getElementById(id);
      element.classList.remove('error');
      dataSection.classList.add('no-display');
      const { regExp, length } = TESTS[id];
      if (!regExp.test(value) || value.length !== length) errors.push(id);
      else fields[id] = value;
      TESTS[id].regExp.test(value);
    }
  }

  if (errors.length) {
    for (const id of errors) {
      const element = document.getElementById(id);
      element.classList.add('error');
    }
    alert('Усі поля мають бути заповненими та відповідати валідації!');
    return;
  }

  dataSection.classList.remove('no-display');

  const items = [];

  for (const field in fields) {
    const item = `
      <p class="info">
        <span class="info-key">${LABELS[field]}</span>: ${fields[field]}
      </p>
    `;
    items.push(item);
  }

  const dataDiv = document.getElementById('data');

  dataDiv.innerHTML = items.join('\n');

  form.reset();
});

const table = document.querySelector('table');

for (let i = 5; i >= 0; i--) {
  const ths = [];
  for (let j = 1; j <= 6; j++) {
    const value = i * 6 + j;
    if (value === 1) {
      const th = `
      <th id="first-cell">
        ${value}
      </th>
    `;
      ths.push(th);
    } else {
      const th = `
      <th>
        ${value}
      </th>
    `;
      ths.push(th);
    }
  }
  const tr = `
    <tr>
      ${ths.join('\n')}
    </tr>
  `;
  table.insertAdjacentHTML('afterbegin', tr);
}

const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const firstCell = document.getElementById('first-cell');

const paletteInput = document.getElementById('palette');

firstCell.addEventListener(
  'mouseenter',
  () => (firstCell.style.backgroundColor = getRandomHexColor()),
);

firstCell.addEventListener('click', () => (firstCell.style.backgroundColor = paletteInput.value));

firstCell.addEventListener('dblclick', () => {
  const { parentElement } = firstCell;
  for (const child of parentElement.children) {
    child.style.backgroundColor = paletteInput.value;
  }
});
