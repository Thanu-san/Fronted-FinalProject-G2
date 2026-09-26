"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

const options = [
  { value: "default", label: "Default order" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
];

// A small product-specific dropdown inspired by beUI's motion select.
export default function ProductSort({ value }: { value: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const menuId = useId();
  const reduceMotion = useReducedMotion();
  const selectedOption = options.find(option => option.value === selected) ?? options[0];

  useEffect(() => {
    if (!open) return;
    root.current?.querySelector<HTMLButtonElement>('[role="menuitemradio"][aria-checked="true"]')?.focus();
    function closeOutside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  return (
    <div className="product-sort" ref={root} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <span id={`${menuId}-label`} className="product-sort-label">Sort by</span>
      <input ref={input} type="hidden" name="sort" defaultValue={selectedOption.value} />
      <button ref={trigger} type="button" className="product-sort-trigger"
        aria-labelledby={`${menuId}-label ${menuId}-value`} aria-haspopup="menu"
        aria-expanded={open} aria-controls={open ? menuId : undefined}
        onClick={() => setOpen(!open)} onKeyDown={event => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault(); setOpen(true);
          }
        }}>
        <span id={`${menuId}-value`}>{selectedOption.label}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>
          <ChevronDown size={16} aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && <motion.div id={menuId} role="menu" aria-labelledby={`${menuId}-label`}
          className="product-sort-menu" initial={{ opacity: 0, y: reduceMotion ? 0 : -6, scale: reduceMotion ? 1 : 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 30 }}
          onKeyDown={event => {
            const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button'));
            const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
            if (event.key === "Escape") {
              event.preventDefault(); setOpen(false); trigger.current?.focus();
            } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
              event.preventDefault();
              const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1
                : (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
              buttons[next]?.focus();
            }
          }}>
          {options.map(option => <button key={option.value} type="button" role="menuitemradio"
            aria-checked={selectedOption.value === option.value} tabIndex={-1}
            onClick={() => {
              setSelected(option.value); setOpen(false); trigger.current?.focus();
              if (input.current) {
                input.current.value = option.value;
                input.current.form?.requestSubmit();
              }
            }}>
            <span>{option.label}</span>
            {selectedOption.value === option.value && <Check size={16} aria-hidden="true" />}
          </button>)}
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}
