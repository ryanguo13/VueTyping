<template>
  <div class="typing">
    <h1>Typing Test</h1>
    <div class="controls">
      <label for="wordCount">Word Count:</label>
      <input id="wordCount" type="number" v-model.number="wordCount" min="20" max="100" class="word-count-input"/>
      <button @click="generateTestText" class="generate-button">Generate Text</button>
    </div>
    <p>Start typing the text below:</p>
    <div class="test-text" ref="testTextContainer">
      <span v-for="(char, index) in testText" :key="index" 
            :class="{'correct': isCorrect(index), 'incorrect': isIncorrect(index)}">
        {{ char }}
      </span>
      <span v-if="showCursor" :style="cursorStyle" class="cursor"></span>
    </div>
    <input class="hidden-input" v-model="typedText" @input="checkTyping" ref="inputField" />
    <div class="stats">
      <p>Speed: {{ speed }} WPM</p>
      <p>Accuracy: {{ accuracy }}%</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TypingComponent',
  data() {
    return {
      testText: '',
      typedText: '',
      startTime: null,
      speed: 0,
      accuracy: 0,
      wordCount: 20, // Initial word count changed to 20
      wordList: [
        "architecture", "biology", "chemistry", "democracy", "education", "fashion", "geography", "history", "innovation", "jurisprudence", 
        "kaleidoscope", "literature", "mathematics", "narrative", "ophthalmology", "philosophy", "quantum", "robotics", "sociology", "technology", 
        "universe", "vocabulary", "webinar", "xenophobia", "yoga", "zoology", "accordion", "banjo", "clarinet", "drum", "flute", 
        "guitar", "harp", "instrument", "jazz", "keyboard", "lute", "mandolin", "nocturne", "opera", "piano", 
        "quartet", "rhythm", "saxophone", "trumpet", "ukulele", "violin", "waltz", "xylophone", "yardstick", "zeppelin", 
        "apple", "banana", "cherry", "date", "eggplant", "fig", "grape", "honeydew", "iceberry", "jackfruit", 
        "kiwi", "lemon", "melon", "nectarine", "orange", "peach", "quince", "raspberry", "strawberry", "tangerine", 
        "umbrella", "vegetable", "walnut", "xigua", "yam", "zucchini"
      ],
      showCursor: true,
      cursorStyle: {
        left: '0px',
        top: '0px',
        width: '1ch'
      },
    }
  },
  methods: {
    generateTestText() {
      let words = [];
      for (let i = 0; i < this.wordCount; i++) {
        const randomIndex = Math.floor(Math.random() * this.wordList.length);
        words.push(this.wordList[randomIndex]);
      }
      this.testText = words.join(' ');
      this.resetTest();
    },
    checkTyping() {
      if (!this.startTime) {
        this.startTime = new Date();
      }

      const typedLength = this.typedText.length;
      const correctChars = this.testText.slice(0, typedLength).split('').filter((char, index) => {
        return this.typedText[index] === this.testText[index];
      }).length;

      const elapsedTime = (new Date() - this.startTime) / 1000 / 60; // minutes
      this.speed = (this.typedText.split(' ').length / elapsedTime).toFixed(2);
      this.accuracy = ((correctChars / typedLength) * 100).toFixed(2);

      this.updateCursor();
    },
    isCorrect(index) {
      return index < this.typedText.length && this.typedText[index] === this.testText[index];
    },
    isIncorrect(index) {
      return index < this.typedText.length && this.typedText[index] !== this.testText[index];
    },
    updateCursor() {
      const typedLength = this.typedText.length;
      const testTextContainer = this.$refs.testTextContainer;

      if (typedLength < this.testText.length) {
        const charElements = testTextContainer.children;
        const currentCharElement = charElements[typedLength];

        const rect = currentCharElement.getBoundingClientRect();
        const containerRect = testTextContainer.getBoundingClientRect();

        this.cursorStyle.left = `${rect.left - containerRect.left}px`;
        this.cursorStyle.top = `${rect.top - containerRect.top + rect.height}px`;
        this.cursorStyle.width = `${rect.width}px`;
      }
    },
    resetTest() {
      this.typedText = '';
      this.startTime = null;
      this.speed = 0;
      this.accuracy = 0;
      this.$nextTick(() => {
        this.$refs.inputField.focus();
      });
    }
  },
  mounted() {
    this.generateTestText();
  }
}
</script>

<style scoped>
.typing {
  text-align: center;
  margin-top: 50px;
  font-family: 'Arial', sans-serif;
}
.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
label {
  font-size: 16px;
  margin-right: 10px;
}
.word-count-input {
  width: 40px; /* Reduced width */
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
  font-size: 16px;
}
.generate-button {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.generate-button:hover {
  background: linear-gradient(135deg, #a777e3, #6e8efb);
}
.test-text {
  font-size: 18px;
  line-height: 1.5;
  word-wrap: break-word;
  white-space: pre-wrap;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px; /* Reduced padding */
  margin-top: 20px;
  background-color: #f9f9f9;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px; /* Set a maximum height */
  overflow-y: auto; /* Add vertical scrolling */
  min-width: fit-content;
  max-width: fit-content;
  margin-left: 250px;
  margin-right: 250px;

}
.correct {
  color: green;
}
.incorrect {
  color: red;
}
.cursor {
  position: absolute;
  height: 2px;
  background-color: black;
  transition: left 0.05s, top 0.05s;
}
.hidden-input {
  position: absolute;
  left: -9999px;
}
.stats {
  margin-top: 20px;
  font-size: 18px;
}
</style>