import { describe, expect, it } from 'vitest';
import { categories } from '../data/catalog';

describe('product categories', () => {
  it('groups products into the three requested top-level categories', () => {
    expect(categories.map((category) => category.slug)).toEqual([
      'ptfe-products',
      'ms-ptfe-lined-products',
      'glass-products',
    ]);

    expect(categories.map((category) => category.name)).toEqual([
      'PTFE Products',
      'MS PTFE Lined Products',
      'Glass Products',
    ]);

    expect(categories.every((category) => category.products.length > 0)).toBe(true);
  });
});
