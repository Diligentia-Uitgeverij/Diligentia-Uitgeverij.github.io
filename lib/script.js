(function() {
  document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
        initApplication();
    }
  };

  let pageGuide;
  let intro;
  const guideElements = [
    {
      content: 'Content is the only required field. You can simply add a string as content',
    },
    {
      content: 'Or you can put <strong>fully fledged</strong> <abbr title="HyperText Markup Language">HTML</abbr> as content',
    },
    {
      title: 'But a title makes everything better',
      content: 'If you really want to, you could simply add <code>&amp;nbsp;</code> or an empty string as content.',
    },
    {
      title: 'Which works for small messages.',
      content: '',
    },
    {
      title: 'Navigation.',
      content: '<p>You can navigate the popup by clicking the arrow buttons, or by navigating by keyboard. <br>To go to the previous message you can hit <strong>up</strong> or <strong>right</strong>. <br>Going to the next message by hitting <strong>left</strong>, <strong>down</strong> or <strong>return</strong>.</p><p>Closing te guide is done by clicking the exit-button, or by clicking on the backdrop or by hitting <strong>Esc</strong>.</p>',
    },
    {
      title: 'Selecting an element',
      content: '<p>To select a single element, simply put it\'s <code>id</code> as the element.</p><p>For instance this popup is defined as follows:</p><pre>{\n\
  title: "Selecting an element",\n\
  content: "&lt;p&gt;To select a single element, simply put it\'s &lt;code&gt;id&lt;/code&gt; as the element.&lt;/p&gt;&lt;p&gt;For instance this popu is defined as follows:&lt;/p&gt;&lt;pre&gt;...&lt;/pre&gt;",\n\
  element: "#links"\n},</pre>',
      element: '#links',
			padding: 5,
    },
    {
      title: 'Selecting multiple elements',
      content: 'Instead of targeting a single element, you can also target multiple elements, by defining a class, or by another valid querySelector.',
			element: 'menu > menuitem',
			position: 'right',
			padding: 2,
		},
    {
      title: 'Position',
      content: 'Different possibilities: this time: <strong>top</strong>',
			element: '.btn-start.inline',
			position: 'top',
			padding: 5,
    },
    {
      title: 'Position',
      content: '<p>Different possibilities: this time: <strong>right</strong></p>',
			element: '.btn-start.inline',
			position: 'right',
			padding: 5,
    },
    {
      title: 'Position',
      content: 'Different possibilities: this time: <strong>bottom</strong>',
			element: '.btn-start.inline',
			position: 'bottom',
			padding: 5,
    },
    {
      title: 'Position',
      content: '<p>Different possibilities: this time: <strong>left</strong></p><p>Sometimes, you\'ll find yourself with too little space for a position, like now. Just pick another position.</p>',
			element: '.btn-start.inline',
			position: 'left',
			padding: 5,
    },
    {
      title: 'Shape',
      content: 'Different possibilities: this time: <strong>rect</strong>',
			element: '.btn-start.inline',
			shape: 'rect',
			padding: 5,
    },
    {
      title: 'Shape',
      content: 'Different possibilities: this time: <strong>rounded_rect</strong>',
			element: '.btn-start.inline',
			shape: 'rounded_rect',
			padding: 5,
    },
    {
      title: 'Shape',
      content: '<p>Different possibilities: this time: <strong>circle</strong></p><p>The circle takes the biggest dimension of the target, so either the width or the height, as radius.</p>',
			element: '.btn-start.inline',
			shape: 'circle',
			padding: 5,
    },
    {
      title: 'Shape',
      content: '<p>Different possibilities: this time: <strong>ellipse</strong></p><p>An ellipse looks like a circle when specified on a target whose width and height are equal.</p>',
			element: '.btn-start.inline',
			shape: 'ellipse',
			padding: 5,
    },
	];
	
	const introElements = transformToIntro(guideElements);
  
  const initApplication = () => {
		console.info(guideElements[5]);
		console.info(introElements[5]);

		pageGuide = new PageGuide.PageGuide(guideElements, false);
		

    const buttons = document.getElementsByClassName('start-guide');
    for (let i=0; i<buttons.length; i++) {
      buttons.item(i).onclick = startGuide;
    }

    const introButtons = document.getElementsByClassName('btn-start-intro');
    for (let i=0; i<introButtons.length; i++) {
      introButtons.item(i).onclick = startIntro;
    }
	};
	
  function startGuide() {
    pageGuide.start();
  };
  function startIntro() {
		intro = introJs();
		intro.setOptions(introElements);
		intro.start();
		
		console.info(intro);
	};
	
	function transformToIntro (elements) {
		return {
			steps: elements
							.slice()
							.map((elm) => {
								let copy = {};
								const title = elm.title ? `<h1>${elm.title}</h1>` : '';
								const content = elm.content || '';
								const target = elm.element;

								copy.intro = title + content;
								copy.position = elm.position;

								if (typeof target === 'string') {
									copy.element = document.querySelector(target);
								}

								return copy;
							})
							.filter(elm => elm !== false),
		};
	}
})();