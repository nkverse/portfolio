"use strict";

// utils
const tap = f => x => {
  f (x);
  return x;
};

const compose = f => g => x =>
  f (g (x));

const if_else = predicate => f => g => x =>
  predicate (x)
  ? f (x)
  : g (x);

const not = x =>
  !x;

const K = x => () => x;

const on = name => f => elem =>
  elem.addEventListener (name, f);

const select = query =>
  Array.from (document.querySelectorAll (query));

const $ = query =>
  document.querySelector (query);


// aliases
const log = console.log;

const make_toggle = f => g => {
  let state = false;
  const flip_state = () => (state = !state)

  return if_else (flip_state) (f) (g);
};



// main
const menu_close = $ (".menu-close");
const mobile_menu = $ (".mobile-menu");
const hamburger = $ (".navbar .menu");
const mobile_menu_li = select (".mobile_menu_list a");

const set_blur = value => elem =>
  elem.style.filter = value;

const toggle_blur = elem => {
  const toggle =
    make_toggle (set_blur ("blur(0.2em)"))
                (set_blur (""));

  return () => toggle (elem);
};

const togglers =
  select (`body :not(.mobile-menu, .mobile-menu *)`)
  .map (toggle_blur);


const toggle_menu = () =>
  mobile_menu.classList.toggle ("hide");

const menu_click = () => {
  togglers.forEach (f => f ());
  toggle_menu ();
};

on ("click") (menu_click) (hamburger);
on ("click") (menu_click) (menu_close);
mobile_menu_li.forEach (on ("click") (menu_click))
