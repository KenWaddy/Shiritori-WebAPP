document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('word-input');
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-btn');
    const wordList = document.getElementById('word-list');
    const gameStatus = document.getElementById('game-status');
    const winIllust = document.getElementById('win-illust');
    const loseIllust = document.getElementById('lose-illust');

    let gameState = {
        isGameOver: false,
        lastWord: '',
        usedWords: new Set(),
    };

    const dictionary = [
        'あめ', 'あき', 'あさ', 'あそび', 'あかい',
        'いぬ', 'いえ', 'いし', 'いちご', 'いたい',
        'うみ', 'うた', 'うし', 'うさぎ', 'うで',
        'えき', 'えほん', 'えんぴつ', 'えいが', 'えだ',
        'おかし', 'おと', 'おかね', 'おにぎり', 'おもちゃ',
        
        'かさ', 'かぜ', 'かみ', 'かばん', 'かお',
        'きつね', 'きって', 'きのこ', 'きもの', 'きんぎょ',
        'くつ', 'くも', 'くさ', 'くるま', 'くち',
        'けいたい', 'けしゴム', 'けが', 'けむり', 'けいさつ',
        'こども', 'こえ', 'こおり', 'ことば', 'こめ',
        
        'さくら', 'さかな', 'さる', 'さとう', 'さいふ',
        'しんぶん', 'しお', 'しま', 'しろい', 'しごと',
        'すいか', 'すし', 'すな', 'すずめ', 'すもう',
        'せんせい', 'せかい', 'せっけん', 'せみ', 'せなか',
        'そら', 'そと', 'そば', 'そうじ', 'そくたつ',
        
        'たべもの', 'たまご', 'たいよう', 'たけ', 'たび',
        'ちず', 'ちから', 'ちいさい', 'ちかてつ', 'ちどり',
        'つくえ', 'つき', 'つばさ', 'つめ', 'つち',
        'てがみ', 'てんき', 'てつだう', 'てぶくろ', 'てんぷら',
        'とけい', 'とり', 'とうふ', 'とびら', 'とんぼ',
        
        'なつ', 'なまえ', 'なみ', 'なべ', 'なか',
        'にわ', 'にく', 'にじ', 'にんじん', 'にもつ',
        'ぬいぐるみ', 'ぬの', 'ぬま', 'ぬりえ', 'ぬくもり',
        'ねこ', 'ねつ', 'ねぎ', 'ねむい', 'ねんど',
        'のり', 'のみもの', 'のうか', 'のこぎり', 'のはら',
        
        'はな', 'はし', 'はこ', 'はがき', 'はさみ',
        'ひこうき', 'ひと', 'ひるま', 'ひつじ', 'ひまわり',
        'ふゆ', 'ふね', 'ふでばこ', 'ふとん', 'ふくろ',
        'へや', 'へび', 'へそ', 'へいわ', 'へんじ',
        'ほん', 'ほし', 'ほうき', 'ほっぺ', 'ほたる',
        
        'まど', 'まち', 'まんが', 'まくら', 'まつり',
        'みず', 'みかん', 'みち', 'みどり', 'みそ',
        'むし', 'むら', 'むぎ', 'むすめ', 'むかし',
        'めがね', 'めだか', 'めろん', 'めいわく', 'めもちょう',
        'もり', 'もち', 'もも', 'もんだい', 'もくよう',
        
        'やま', 'やさい', 'やかん', 'やきゅう', 'やすみ',
        'ゆき', 'ゆび', 'ゆうびん', 'ゆめ', 'ゆでたまご',
        'よる', 'よこ', 'よもぎ', 'ようふく', 'よてい',
        
        'らいおん', 'らくだ', 'らっぱ', 'らくがき', 'らーめん',
        'りんご', 'りす', 'りぼん', 'りょうり', 'りゅう',
        'るすばん', 'るい', 'るびー', 'るーる', 'るーと',
        'れいぞうこ', 'れもん', 'れたす', 'れんが', 'れきし',
        'ろうそく', 'ろば', 'ろけっと', 'ろーる', 'ろじ',
        
        'わに', 'わた', 'わらい', 'わさび', 'わかめ',
        'をとこ',
        
        'がっこう', 'がいこく', 'がまん', 'がらす', 'がいしゃ',
        'ぎんこう', 'ぎゅうにゅう', 'ぎたー', 'ぎょうざ', 'ぎんいろ',
        'ぐんて', 'ぐち', 'ぐみ', 'ぐらす', 'ぐうぜん',
        'げんき', 'げーむ', 'げた', 'げきじょう', 'げんかん',
        'ごはん', 'ごみ', 'ごご', 'ごりら', 'ごうかく',
        
        'ざっし', 'ざる', 'ざらざら', 'ざいりょう', 'ざぶとん',
        'じてんしゃ', 'じかん', 'じゃがいも', 'じしょ', 'じどう',
        'ずぼん', 'ずかん', 'ずっと', 'ずるい', 'ずっく',
        'ぜんぶ', 'ぜんまい', 'ぜいたく', 'ぜっく', 'ぜみなー',
        'ぞう', 'ぞうり', 'ぞんび', 'ぞくぞく', 'ぞんざい',
        
        'だいがく', 'だれ', 'だいこん', 'だんご', 'だいどころ',
        'ぢしん', 'ぢめん', 'ぢょうき', 'ぢょうず', 'ぢょうぶ',
        'づくり', 'づき', 'づつみ', 'づら', 'づかい',
        'でんわ', 'でんしゃ', 'でぐち', 'でんき', 'でんち',
        'どうぶつ', 'どあ', 'どろ', 'どんぶり', 'どくしょ',
        
        'ばなな', 'ばす', 'ばか', 'ばった', 'ばくだん',
        'びょういん', 'びん', 'びーる', 'びわ', 'びじゅつかん',
        'ぶたにく', 'ぶどう', 'ぶらんこ', 'ぶろぐ', 'ぶんぼうぐ',
        'べんとう', 'べると', 'べんきょう', 'べーこん', 'べんち',
        'ぼうし', 'ぼーる', 'ぼうず', 'ぼたん', 'ぼんさい',
        
        'ぱん', 'ぱんだ', 'ぱーてぃー', 'ぱいなっぷる', 'ぱじゃま',
        'ぴあの', 'ぴーまん', 'ぴかぴか', 'ぴんく', 'ぴっちゃー',
        'ぷーる', 'ぷりん', 'ぷらねっと', 'ぷれぜんと', 'ぷろぐらむ',
        'ぺん', 'ぺーじ', 'ぺんぎん', 'ぺっと', 'ぺらぺら',
        'ぽけっと', 'ぽすと', 'ぽてと', 'ぽーず', 'ぽいんと'
    ];

    function initGame() {
        gameState = {
            isGameOver: false,
            lastWord: '',
            usedWords: new Set(),
        };
        wordList.innerHTML = '';
        gameStatus.innerHTML = '<p>ゲームを始めましょう！最初の言葉を入力してください。</p>';
        wordInput.value = '';
        wordInput.disabled = false;
        submitBtn.disabled = false;
        
        winIllust.style.display = 'none';
        loseIllust.style.display = 'none';
    }

    function isValidHiragana(word) {
        return /^[ぁ-ゖー]*$/.test(word);
    }

    function isValidShiritoriWord(word) {
        if (!word || word.length === 0) {
            return { valid: false, reason: '言葉を入力してください。' };
        }

        if (!isValidHiragana(word)) {
            return { valid: false, reason: 'ひらがなのみ使用可能です。' };
        }

        if (word.endsWith('ん')) {
            return { valid: true, endWithN: true };
        }

        if (gameState.usedWords.has(word)) {
            return { valid: false, reason: 'その言葉はすでに使われています。' };
        }

        if (gameState.lastWord && gameState.lastWord.length > 0) {
            const lastChar = gameState.lastWord.slice(-1);
            const firstChar = word.charAt(0);
            
            if (!isDakutenMatch(lastChar, firstChar)) {
                const normalizedLastChar = normalizeSmallCharacter(lastChar);
                const normalizedFirstChar = normalizeSmallCharacter(firstChar);
                return { 
                    valid: false, 
                    reason: `「${normalizedLastChar}」で終わる言葉に対して「${normalizedFirstChar}」で始まる言葉は使えません。` 
                };
            }
        }

        return { valid: true, endWithN: false };
    }

    function isDakutenMatch(lastChar, firstChar) {
        const dakutenPairs = {
            'か': 'が', 'き': 'ぎ', 'く': 'ぐ', 'け': 'げ', 'こ': 'ご',
            'さ': 'ざ', 'し': 'じ', 'す': 'ず', 'せ': 'ぜ', 'そ': 'ぞ',
            'た': 'だ', 'ち': 'ぢ', 'つ': 'づ', 'て': 'で', 'と': 'ど',
            'は': 'ば', 'ひ': 'び', 'ふ': 'ぶ', 'へ': 'べ', 'ほ': 'ぼ',
            'は': 'ぱ', 'ひ': 'ぴ', 'ふ': 'ぷ', 'へ': 'ぺ', 'ほ': 'ぽ'
        };

        const reverseDakutenPairs = {};
        for (const [key, value] of Object.entries(dakutenPairs)) {
            reverseDakutenPairs[value] = key;
        }
        
        const normalizedLastChar = normalizeSmallCharacter(lastChar);
        const normalizedFirstChar = normalizeSmallCharacter(firstChar);

        if (normalizedLastChar === normalizedFirstChar) {
            return true;
        }

        if (dakutenPairs[normalizedLastChar] === normalizedFirstChar || 
            reverseDakutenPairs[normalizedLastChar] === normalizedFirstChar) {
            return true;
        }

        return false;
    }

    function getBaseCharacter(char) {
        const dakutenMap = {
            'が': 'か', 'ぎ': 'き', 'ぐ': 'く', 'げ': 'け', 'ご': 'こ',
            'ざ': 'さ', 'じ': 'し', 'ず': 'す', 'ぜ': 'せ', 'ぞ': 'そ',
            'だ': 'た', 'ぢ': 'ち', 'づ': 'つ', 'で': 'て', 'ど': 'と',
            'ば': 'は', 'び': 'ひ', 'ぶ': 'ふ', 'べ': 'へ', 'ぼ': 'ほ',
            'ぱ': 'は', 'ぴ': 'ひ', 'ぷ': 'ふ', 'ぺ': 'へ', 'ぽ': 'ほ'
        };

        return dakutenMap[char] || char;
    }
    
    function normalizeSmallCharacter(char) {
        const smallCharMap = {
            'ゃ': 'や', 'ゅ': 'ゆ', 'ょ': 'よ'
        };
        
        return smallCharMap[char] || char;
    }

    function findResponseWord(lastChar) {
        const baseChar = getBaseCharacter(lastChar);
        const normalizedLastChar = normalizeSmallCharacter(lastChar);
        
        const possibleWords = dictionary.filter(word => {
            const firstChar = word.charAt(0);
            return isDakutenMatch(lastChar, firstChar) && !gameState.usedWords.has(word);
        });

        if (possibleWords.length === 0) {
            return null;
        }

        const wordsEndingWithN = possibleWords.filter(word => word.endsWith('ん'));
        
        if (wordsEndingWithN.length > 0 && Math.random() < 0.1) {
            return wordsEndingWithN[Math.floor(Math.random() * wordsEndingWithN.length)];
        }
        
        return possibleWords[Math.floor(Math.random() * possibleWords.length)];
    }

    function addWordToHistory(word, isUser) {
        const li = document.createElement('li');
        li.textContent = word;
        li.className = isUser ? 'user-word' : 'app-word';
        wordList.appendChild(li);
        wordList.scrollTop = wordList.scrollHeight;
    }

    function handleUserTurn() {
        if (gameState.isGameOver) {
            return;
        }

        const userWord = wordInput.value.trim();
        const validation = isValidShiritoriWord(userWord);

        if (!validation.valid) {
            gameStatus.innerHTML = `<p>${validation.reason}</p>`;
            return;
        }

        if (validation.endWithN) {
            gameState.isGameOver = true;
            addWordToHistory(userWord, true);
            gameStatus.innerHTML = '<p class="lose-message">「ん」で終わる言葉を使ったので、あなたの負けです！</p>';
            wordInput.disabled = true;
            submitBtn.disabled = true;
            
            loseIllust.style.display = 'block';
            winIllust.style.display = 'none';
            return;
        }

        addWordToHistory(userWord, true);
        gameState.usedWords.add(userWord);
        gameState.lastWord = userWord;
        wordInput.value = '';

        setTimeout(handleAppTurn, 1000);
    }

    function handleAppTurn() {
        if (gameState.isGameOver) {
            return;
        }

        const lastChar = gameState.lastWord.slice(-1);
        const responseWord = findResponseWord(lastChar);

        if (!responseWord) {
            gameStatus.innerHTML = '<p class="win-message">適切な言葉が見つかりません。あなたの勝ちです！</p>';
            gameState.isGameOver = true;
            wordInput.disabled = true;
            submitBtn.disabled = true;
            
            winIllust.style.display = 'block';
            loseIllust.style.display = 'none';
            return;
        }

        addWordToHistory(responseWord, false);
        gameState.usedWords.add(responseWord);
        gameState.lastWord = responseWord;

        if (responseWord.endsWith('ん')) {
            gameStatus.innerHTML = '<p class="win-message">アプリの言葉が「ん」で終わりました。あなたの勝ちです！</p>';
            gameState.isGameOver = true;
            wordInput.disabled = true;
            submitBtn.disabled = true;
            
            winIllust.style.display = 'block';
            loseIllust.style.display = 'none';
            return;
        }

        gameStatus.innerHTML = `<p>アプリ：「${responseWord}」</p><p>次の言葉を入力してください。</p>`;
    }

    submitBtn.addEventListener('click', handleUserTurn);
    wordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserTurn();
        }
    });
    resetBtn.addEventListener('click', initGame);

    initGame();
});
