class LottoBall extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const number = this.getAttribute('number');
    const color = this.getColor(number);
    this.shadowRoot.innerHTML = `
      <style>
        .ball {
          --ball-size: 50px;
          width: var(--ball-size);
          height: var(--ball-size);
          border-radius: 50%;
          background-color: ${color};
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5em;
          font-weight: bold;
          color: #fff;
          margin: 10px;
          box-shadow: 5px 5px 10px rgba(0,0,0,0.2), 
                      inset -2px -5px 10px rgba(0,0,0,0.3),
                      inset 2px 5px 10px rgba(255,255,255,0.5);
          animation: pop-in 0.5s ease-out forwards;
        }

        @keyframes pop-in {
          0% { transform: scale(0); }
          80% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @media (max-width: 600px) {
            .ball {
                --ball-size: 40px;
                font-size: 1.2em;
            }
        }
      </style>
      <div class="ball">${number}</div>
    `;
  }

  getColor(number) {
    const num = parseInt(number, 10);
    if (num <= 10) return '#fbc400'; // Yellow
    if (num <= 20) return '#69c8f2'; // Blue
    if (num <= 30) return '#ff7272'; // Red
    if (num <= 40) return '#aaa';    // Gray
    return '#b0d840';               // Green
  }
}

customElements.define('lotto-ball', LottoBall);

const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');

generateBtn.addEventListener('click', () => {
  lottoNumbersContainer.innerHTML = '';
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }

  const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

  sortedNumbers.forEach((number, index) => {
    setTimeout(() => {
      const lottoBall = document.createElement('lotto-ball');
      lottoBall.setAttribute('number', number);
      lottoNumbersContainer.appendChild(lottoBall);
    }, index * 300); // Stagger the animation
  });
});