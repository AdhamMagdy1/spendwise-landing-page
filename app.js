function runDown() {
  document.querySelector('.download').classList.add('active');
}
// Function to check the device type and update the display
function updateDeviceInfo(deviceType) {
  // Hide all device info sections
  document.querySelectorAll('.device-info').forEach(function (info) {
    info.style.display = 'none';
  });

  // Show the corresponding device info section
  document.getElementById(deviceType + 'Info').style.display = 'block';
}

// Function to check the device type and select the corresponding radio button
function checkDevice(userTriggered) {
  const userAgent = navigator.userAgent.toLowerCase();
  let selectedDevice;

  if (userAgent.includes('android')) {
    selectedDevice = 'android';
  } else if (
    userAgent.includes('iphone') ||
    userAgent.includes('ipad') ||
    userAgent.includes('ipod')
  ) {
    selectedDevice = 'ios';
  } else {
    selectedDevice = 'desktop';
  }

  // Update the display based on the selected device
  updateDeviceInfo(selectedDevice);

  // Select the corresponding radio button
  document.querySelector(
    'input[value="' + selectedDevice + '"]'
  ).checked = true;
}

// Call the function when the page loads
window.onload = function () {
  checkDevice(false); // Pass false to indicate that it's not user-triggered
};

// Add event listener to radio buttons to update the display when the user changes the selection
document.querySelectorAll('input[name="device"]').forEach(function (radio) {
  radio.addEventListener('change', function () {
    updateDeviceInfo(this.value);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const sliderContainer = document.querySelector('.slider-container');
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.slider-dots');

  let currentIndex = 0;

  // Create dots based on the number of slides
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', function () {
      currentIndex = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  }

  // Make the first dot active by default
  dotsContainer.children[0].classList.add('active');

  // Update slide based on scroll position
  sliderContainer.addEventListener('scroll', function () {
    const scrollPosition = sliderContainer.scrollLeft;
    currentIndex = Math.round(scrollPosition / window.innerWidth);
    updateSlider();
  });

  nextBtn.addEventListener('click', function () {
    if (currentIndex === slides.length - 1) {
      // If on the last slide, change button text and navigate to a certain website
      nextBtn.innerHTML = 'Download';
      // Change the URL below to the desired website
      nextBtn.addEventListener('click', runDown()); ///////////////////////////
    } else {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }
  });

  // Intersection Observer for the animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate');
        }
      });
    },
    { threshold: 0.5 }
  ); // Adjust the threshold as needed

  slides.forEach((slide) => {
    observer.observe(slide);
  });

  function updateSlider() {
    const translateValue = -currentIndex * 100 + 'vw';
    slider.style.transform = 'translateX(' + translateValue + ')';

    // Update arrow direction
    if (currentIndex === slides.length - 1) {
      nextBtn.innerHTML = 'Download';
    } else {
      nextBtn.innerHTML = 'Next';
    }

    // Update dots
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update active class for the current slide
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }
});
