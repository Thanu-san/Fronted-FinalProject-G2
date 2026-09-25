"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useMotionTemplate, useSpring, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Box, Sparkles } from "lucide-react";
import type { Product } from "@/types/product";

export default function ProductHero({ products, total }: { products: Product[]; total: number }) {
  const [selected, setSelected] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 160, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 160, damping: 24 });
  const glowX = useMotionValue(70);
  const glowY = useMotionValue(40);
  const glow = useMotionTemplate`radial-gradient(600px circle at ${glowX}% ${glowY}%, #8b5cf62b, transparent 75%)`;
  const product = products[selected] ?? products[0];
  const image = product?.thumbnail;
  const validImage = image && /^https?:\/\//i.test(image) && !failedImages.includes(image);

  return (
    <section className="product-showcase" data-preview={selected} aria-labelledby="product-hero-heading"
      onPointerMove={event => {
        if (reduceMotion || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        glowX.set((event.clientX - rect.left) / rect.width * 100);
        glowY.set((event.clientY - rect.top) / rect.height * 100);
      }}>
      <motion.div className="product-showcase-glow" style={{ background: glow }} aria-hidden="true" />
      <div className="product-showcase-orbit" aria-hidden="true"><span /><span /><span /></div>
      <div className="product-showcase-grid" aria-hidden="true" />
      <div className="products-container product-showcase-layout">
        <motion.div className="product-showcase-copy"
          initial={false} animate={{ opacity: 1, y: 0 }}>
          <p className="product-showcase-eyebrow"><Sparkles size={15} aria-hidden="true" /> THE NEXTSHOP COLLECTION</p>
          <h1 id="product-hero-heading">Discover more.<br /><span>Make it yours.</span></h1>
          <p>A fresh perspective on your everyday essentials. Find your next upgrade, explore the details, and make room for something great.</p>
          <div className="product-showcase-actions">
            <a className="product-button" href="#product-catalog">Explore products <ArrowDown size={17} aria-hidden="true" /></a>
            <span><strong>{total.toLocaleString()}</strong> products to discover</span>
          </div>
          <div className="product-showcase-note"><span>01 / EXPLORE</span><i /><span>02 / FIND YOUR FIT</span><i /><span>03 / MAKE IT YOURS</span></div>
        </motion.div>

        {product && <div className="product-showcase-preview">
          <div className="product-showcase-stack" aria-hidden="true" />
          <div className="product-showcase-floating"><Sparkles size={16} aria-hidden="true" /><span>In the spotlight<strong>Your next upgrade</strong></span></div>
          <motion.article className="product-showcase-card"
            style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY }}
            onPointerMove={event => {
              if (reduceMotion || event.pointerType !== "mouse") return;
              const rect = event.currentTarget.getBoundingClientRect();
              x.set(-((event.clientY - rect.top) / rect.height - 0.5) * 7);
              y.set(((event.clientX - rect.left) / rect.width - 0.5) * 7);
            }}
            onPointerLeave={() => { x.set(0); y.set(0); }}>
            <div className="product-showcase-card-top"><span><span className="product-showcase-live" /> PRODUCT EXPLORER</span><span>{String(selected + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}</span></div>
            <Link href={`/products/${product.uuid}`} className="product-showcase-image" aria-label={`View ${product.name}`}>
              <motion.div key={product.uuid} initial={reduceMotion ? false : { opacity: 0, scale: 0.86, x: 24, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }} transition={{ duration: reduceMotion ? 0 : 0.45 }}>
                {validImage ? (
                  // Product images use external API hosts and may be unavailable.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt={product.name} onError={() => setFailedImages(previous => [...previous, image])} />
                ) : <span className="product-showcase-fallback"><Box size={64} /><span>Discover this product</span></span>}
              </motion.div>
            </Link>
            <div className="product-showcase-info" aria-live="polite" aria-atomic="true">
              <div><span className="product-showcase-available">{product.availability && product.stockQuantity > 0 ? "Available to explore" : "Currently unavailable"}</span><h2>{product.name}</h2><p>{product.priceOut.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p></div>
              <Link href={`/products/${product.uuid}`} aria-label={`View details for ${product.name}`}><ArrowUpRight size={23} /></Link>
            </div>
          </motion.article>
          {products.length > 1 && <div className="product-showcase-switcher" role="group" aria-label="Choose a spotlight product">
            {products.map((item, index) => <button type="button" key={item.uuid} aria-label={`Preview ${item.name}`}
              aria-pressed={selected === index} onClick={() => setSelected(index)}>
              {item.thumbnail && /^https?:\/\//i.test(item.thumbnail) && !failedImages.includes(item.thumbnail) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.thumbnail} alt="" onError={() => setFailedImages(previous => [...previous, item.thumbnail!])} />
              ) : <Box size={20} aria-hidden="true" />}
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>)}
            <span>Pick your next find</span>
          </div>}
        </div>}
      </div>
    </section>
  );
}
