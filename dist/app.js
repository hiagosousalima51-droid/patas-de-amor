(() => {
  'use strict';
  const config = window.PATAS_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);
  document.documentElement.classList.add('js-ready');
  const menu = $('#navigation'), toggle = $('.menu-toggle');
  function setMenu(open, returnFocus = false) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('open', open);
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;
    setMenu(false);
    if (matchMedia('(max-width:680px)').matches) {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
    }
  });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && menu.classList.contains('open')) setMenu(false, true); });
  document.addEventListener('click', e => { if(!e.target.closest('.header') && menu.classList.contains('open')) setMenu(false); });
  document.addEventListener('focusin', e => { if(!e.target.closest('.header') && menu.classList.contains('open')) setMenu(false); });
  matchMedia('(max-width:680px)').addEventListener('change', () => setMenu(false));
  const updateHeader = () => $('.header').classList.toggle('scrolled', scrollY > 12);
  window.addEventListener('scroll', updateHeader, { passive:true }); updateHeader();
  $('#year').textContent = new Date().getFullYear();
  const safeURL = raw => { try { const url = new URL(raw); return url.protocol === 'https:' ? url.href : null; } catch { return null; } };
  const phone = String(config.whatsapp || '').trim();
  const phoneReady = /^55[1-9]\d{9,10}$/.test(phone);
  const demo = $('#demo-notice');
  demo.hidden = phoneReady;
  if (!phoneReady && config.texts?.demo) demo.textContent = config.texts.demo;
  if (phoneReady) {
    const link = document.createElement('a'); link.href = `https://wa.me/${phone}`; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = config.whatsappLabel || 'Conversar pelo WhatsApp';
    $('#contact-whatsapp').replaceChildren(link);
  }
  if(config.address) $('#contact-address').textContent = config.address;
  if(config.openingHours) $('#contact-hours').textContent = config.openingHours;
  if(safeURL(config.maps)) { $('#maps-link').href = safeURL(config.maps); $('#maps-link').hidden = false; }
  if(safeURL(config.instagram)) {
    const link = document.createElement('a'); link.href = safeURL(config.instagram); link.textContent = config.instagramLabel || 'Nosso Instagram ↗'; link.target='_blank'; link.rel='noopener noreferrer'; $('#contact-instagram').replaceChildren(link);
  }
  if(config.logo && !/^(javascript:|data:)/i.test(config.logo)) document.querySelectorAll('.brand').forEach(brand => {
    const img = new Image(); img.src = config.logo; img.alt = config.businessName || 'Patas de Amor'; img.style.cssText='max-width:190px;max-height:62px;object-fit:contain'; img.onload = () => brand.replaceChildren(img);
  });
  const serviceSelect = $('#service');
  if(Array.isArray(config.services) && config.services.length) {
    serviceSelect.replaceChildren(new Option('Selecione um cuidado', ''));
    config.services.forEach(service => serviceSelect.add(new Option(service, service)));
  }
  document.querySelectorAll('[data-service]').forEach(card => card.addEventListener('click', () => {
    const value = card.dataset.service;
    if([...serviceSelect.options].some(option => option.value === value)) serviceSelect.value = value;
    serviceSelect.removeAttribute('aria-invalid'); $('#service-error').textContent='';
  }));
  const form = $('#booking-form'), status = $('#form-status'), dateField = $('#date');
  function today() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
  dateField.min = today(); dateField.addEventListener('focus', () => dateField.min = today());
  $('.submit-button').disabled = false;
  const required = ['tutor', 'pet', 'service', 'size'];
  function validateField(id) {
    const field = $(`#${id}`); let error = '';
    if(required.includes(id) && !field.value.trim()) error = 'Preencha este campo para continuar.';
    if(['tutor','pet'].includes(id) && field.value.trim().length === 1) error = 'Informe um nome com pelo menos 2 caracteres.';
    if(id === 'date' && (field.validity.badInput || (field.value && field.value < today()))) error = 'Escolha hoje ou uma data futura.';
    if(id === 'service' && field.value && ![...field.options].some(o => o.value === field.value)) error = 'Selecione um serviço disponível.';
    field.setAttribute('aria-invalid', String(!!error));
    $(`#${id}-error`).textContent = error;
    return !error;
  }
  [...required, 'date'].forEach(id => $(`#${id}`).addEventListener('input', () => {
    if($(`#${id}`).hasAttribute('aria-invalid')) validateField(id);
    status.textContent = ''; $('#message-preview').hidden = true; $('#message-text').textContent = '';
  }));
  $('#period').addEventListener('change', () => { status.textContent = ''; $('#message-preview').hidden = true; $('#message-text').textContent=''; });
  function formatDate(value) { if(!value) return 'Sem preferência'; const [year, month, day] = value.split('-'); return `${day}/${month}/${year}`; }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const invalid = [...required,'date'].filter(id => !validateField(id));
    if(invalid.length) { status.textContent = 'Confira os campos destacados para preparar sua solicitação.'; $(`#${invalid[0]}`).focus(); return; }
    const text = config.texts || {};
    const message = `${text.greeting || 'Olá, equipe Patas de Amor! 🐾'}\n\n${text.request || 'Gostaria de consultar a disponibilidade para um agendamento.'}\n\nTutor: ${$('#tutor').value.trim()}\nPet: ${$('#pet').value.trim()}\nServiço: ${serviceSelect.value}\nPorte: ${$('#size').value}\nData de preferência: ${formatDate(dateField.value)}\nPeríodo: ${$('#period').value || 'Sem preferência'}\n\n${text.closing || 'Podem me informar os horários disponíveis? Obrigado!'}`;
    $('#message-text').textContent = message;
    $('#message-preview').hidden = false;
    if(!phoneReady) {
      status.textContent = 'Mensagem preparada em demonstração. Nada foi enviado: o WhatsApp da Patas de Amor ainda precisa ser configurado.';
      $('#message-preview').open = true;
      status.focus({preventScroll:true}); return;
    }
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    status.replaceChildren(document.createTextNode('Continue no WhatsApp para enviar sua mensagem. O horário só será confirmado pela equipe. '));
    const retry = document.createElement('a'); retry.href=url; retry.target='_blank'; retry.rel='noopener noreferrer'; retry.textContent='Abrir conversa'; retry.style.textDecoration='underline'; status.append(retry);
  });
  // Progressive enhancement: the entire page stays visible when GSAP is unavailable.
  if(!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const intro = gsap.timeline({defaults:{duration:.65,ease:'power3.out'}});
    intro.from('.nav-wrap',{y:-12,opacity:0,duration:.4})
      .from('h1>span',{y:24,opacity:0,stagger:.08},.1)
      .from('.hero-dog-wrap',{y:35,scale:.97,opacity:0,duration:.85},.25)
      .from('.hero-art .doodle,.love-seal,.floating-label,.toy-ball,.bubble',{scale:.85,opacity:0,stagger:.055},.4)
      .from('.hero-description,.hero-actions,.hero-note',{y:14,opacity:0,stagger:.08},.5);
    gsap.utils.toArray('.reveal').forEach(el => gsap.from(el,{y:28,opacity:0,duration:.7,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}}));
    gsap.to('.transition-paw',{rotation:60,x:65,ease:'none',scrollTrigger:{trigger:'.difference',start:'top bottom',end:'top 20%',scrub:1}});
    gsap.fromTo('.difference',{backgroundColor:'#fff1b8'},{backgroundColor:'#e5f7f7',scrollTrigger:{trigger:'.difference',start:'top bottom',end:'top 30%',scrub:1}});
  });
  mm.add('(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const ambient = gsap.timeline({repeat:-1,yoyo:true,paused:true}).to('.bubble-one,.bubble-three',{y:-10,duration:3.5,ease:'sine.inOut'},0).to('.star-one',{rotation:18,duration:4,ease:'sine.inOut'},0);
    const observe = new IntersectionObserver(([entry]) => entry.isIntersecting && !document.hidden ? ambient.play() : ambient.pause()); observe.observe($('.hero'));
    const onVisibility = () => { if(document.hidden) ambient.pause(); else if($('.hero').getBoundingClientRect().bottom > 0) ambient.play(); }; document.addEventListener('visibilitychange', onVisibility);
    const art = $('.hero-art'), ball = $('.toy-ball');
    const move = e => { const rect = art.getBoundingClientRect(); ball.style.translate = `${(e.clientX-rect.left-rect.width/2)*.035}px ${(e.clientY-rect.top-rect.height/2)*.025}px`; };
    const reset = () => { ball.style.translate='0px 0px'; };
    art.addEventListener('pointermove',move); art.addEventListener('pointerleave',reset);
    gsap.to('.sun-outline',{y:25,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
    return () => { observe.disconnect(); document.removeEventListener('visibilitychange',onVisibility); art.removeEventListener('pointermove',move); art.removeEventListener('pointerleave',reset); reset(); };
  });
})();
