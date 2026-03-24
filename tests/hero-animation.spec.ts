import { test, expect } from '@playwright/test';

// Helper: get the computed opacity of an element (resolving through parent groups)
async function getEffectiveOpacity(page: any, selector: string): Promise<number> {
  return page.evaluate((sel: string) => {
    const el = document.querySelector(sel);
    if (!el) return 0;
    // Walk up the tree multiplying opacities to get effective visibility
    let opacity = 1;
    let current: Element | null = el;
    while (current && current !== document.documentElement) {
      const style = window.getComputedStyle(current);
      opacity *= parseFloat(style.opacity);
      current = current.parentElement;
    }
    return opacity;
  }, selector);
}

// Helper: wait for GSAP entrance timeline to complete (all elements visible, arc drawn)
async function waitForEntranceComplete(page: any) {
  // Wait for the last elements in the staggered timeline to become visible
  await page.waitForFunction(() => {
    const codeLine8 = document.querySelector('#code-line-8');
    const titlebar = document.querySelector('#editor-titlebar');
    const arc = document.querySelector('#connect-arc') as SVGPathElement | null;
    if (!codeLine8 || !titlebar || !arc) return false;
    const codeOpacity = parseFloat(window.getComputedStyle(codeLine8).opacity);
    const titlebarOpacity = parseFloat(window.getComputedStyle(titlebar).opacity);
    const dashOffset = parseFloat(window.getComputedStyle(arc).strokeDashoffset) || 0;
    return codeOpacity > 0.5 && titlebarOpacity > 0.5 && Math.abs(dashOffset) < 1;
  }, { timeout: 10000 });
}

test.describe('Hero animation visibility', () => {

  test('groups become visible after GSAP initializes', async ({ page }) => {
    await page.goto('/');

    // Wait for GSAP to run (give it a moment to execute)
    await page.waitForTimeout(500);

    // Groups must have opacity > 0 after GSAP init (CSS starts them at 0)
    const phoneGroupOpacity = await getEffectiveOpacity(page, '#phone-group');
    const bubbleGroupOpacity = await getEffectiveOpacity(page, '#bubble-group');
    const editorGroupOpacity = await getEffectiveOpacity(page, '#editor-group');
    const arcOpacity = await getEffectiveOpacity(page, '#connect-arc');

    expect(phoneGroupOpacity).toBeGreaterThan(0);
    expect(bubbleGroupOpacity).toBeGreaterThan(0);
    expect(editorGroupOpacity).toBeGreaterThan(0);
    expect(arcOpacity).toBeGreaterThan(0);
  });

  test('all children become visible after entrance timeline completes', async ({ page }) => {
    await page.goto('/');
    await waitForEntranceComplete(page);

    // Phone elements
    for (const sel of ['#phone-shell', '#phone-screen', '#screen-line-1', '#screen-line-2', '#screen-line-3', '#home-indicator']) {
      const opacity = await getEffectiveOpacity(page, sel);
      expect(opacity, `${sel} should be visible`).toBeGreaterThan(0.5);
    }

    // Bubble elements (bubble itself has SVG opacity=0.85)
    const bubbleOpacity = await getEffectiveOpacity(page, '#bubble');
    expect(bubbleOpacity, '#bubble should be visible (~0.85)').toBeGreaterThan(0.5);
    for (const sel of ['#bubble-line-1', '#bubble-line-2', '#bubble-line-3']) {
      const opacity = await getEffectiveOpacity(page, sel);
      expect(opacity, `${sel} should be visible`).toBeGreaterThan(0.5);
    }

    // Editor elements
    for (const sel of ['#editor-frame', '#editor-titlebar', '#editor-dot-red', '#editor-dot-yellow', '#editor-dot-green']) {
      const opacity = await getEffectiveOpacity(page, sel);
      expect(opacity, `${sel} should be visible`).toBeGreaterThan(0.5);
    }

    // Code lines
    for (let i = 1; i <= 8; i++) {
      const opacity = await getEffectiveOpacity(page, `#code-line-${i}`);
      expect(opacity, `#code-line-${i} should be visible`).toBeGreaterThan(0.3);
    }
  });

  test('connect-arc is fully drawn after entrance', async ({ page }) => {
    await page.goto('/');
    await waitForEntranceComplete(page);

    const dashOffset = await page.evaluate(() => {
      const arc = document.querySelector('#connect-arc') as SVGPathElement | null;
      if (!arc) return 999;
      return parseFloat(window.getComputedStyle(arc).strokeDashoffset) || 0;
    });

    // strokeDashoffset should be 0 or very close (arc fully drawn)
    expect(Math.abs(dashOffset)).toBeLessThan(1);
  });

  test('reduced motion: all elements visible immediately', async ({ page }) => {
    // Emulate prefers-reduced-motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Give a brief moment for JS to execute
    await page.waitForTimeout(300);

    // Groups must be visible
    for (const sel of ['#phone-group', '#bubble-group', '#editor-group']) {
      const opacity = await getEffectiveOpacity(page, sel);
      expect(opacity, `${sel} should be visible with reduced motion`).toBeGreaterThan(0.5);
    }

    // Key children must be visible
    for (const sel of ['#phone-shell', '#editor-frame', '#bubble']) {
      const opacity = await getEffectiveOpacity(page, sel);
      expect(opacity, `${sel} should be visible with reduced motion`).toBeGreaterThan(0.5);
    }
  });
});
