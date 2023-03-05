import { test, expect, vi } from 'vitest';
import { Bullet } from './Bullet';
import { Enemy } from './Enemy';
import { Player } from './Player';

expect.extend({
  toBeCloseTo(received: number, expected: number, precision: number) {
    const pass = Math.abs(received - expected) < precision;
    return {
      pass,
      message: () =>
        `expected ${received} to be close to ${expected} with precision ${precision}`,
    };
  },
});

test('smoke test', () => {
  const bullet = new Bullet({} as Player, []);
  expect(bullet).toBeTruthy();
});

test('findClosestEnemy when there are no enemy points to top', () => {
  const bullet = new Bullet({} as Player, []);

  expect(bullet.findClosestEnemy([], { x: 100, width: 100 } as Player)).toEqual(
    {
      x: 150,
      y: 0,
    }
  );
});

test('findClosestEnemy when there are enemies finds closest enemy', () => {
  const bullet = new Bullet(
    {
      x: 150,
      y: 150,
      width: 100,
      height: 100,
    } as Player,
    []
  );

  expect(
    bullet.findClosestEnemy(
      [
        {
          x: 2000,
          y: 2000,
          width: 100,
          height: 100,
        } as Enemy,
        {
          x: 100,
          y: 100,
          width: 100,
          height: 100,
        } as Enemy,
        {
          x: 1000,
          y: 1000,
          width: 100,
          height: 100,
        } as Enemy,
      ],
      { x: 100, width: 100 } as Player
    )
  ).toEqual({
    x: 150,
    y: 150,
  });
});

test('calculateDistance', () => {
  const bullet = new Bullet(
    { x: 100, y: 100, width: 100, height: 100 } as Player,
    []
  );

  expect(bullet.calculateDistance({ x: 200, y: 200 })).toBeCloseTo(78.7, 1);
});

test('moveTowardsEnemy', () => {
  vi.useFakeTimers();
  const bullet = new Bullet(
    { x: 100, y: 100, width: 100, height: 100 } as Player,
    []
  );

  bullet.moveTowardsEnemy({ x: 200, y: 200 });

  vi.advanceTimersByTime(1000);

  expect(bullet.x).toBeCloseTo(886, 1);
  expect(bullet.y).toBeCloseTo(-147, 1);
});

test('isOffScreen', () => {
  vi.stubGlobal('window', {
    innerWidth: 1000,
    innerHeight: 1000,
  });

  const bullet = new Bullet(
    { x: 100, y: 100, width: 100, height: 100 } as Player,
    []
  );

  expect(bullet.isOffScreen()).toBe(false);

  bullet.x = -100;

  expect(bullet.isOffScreen()).toBe(true);
});

test('draw', () => {
  const bullet = new Bullet(
    { x: 100, y: 100, width: 100, height: 100 } as Player,
    []
  );

  const ctx = {
    fillRect: vi.fn(),
  };

  bullet.draw(ctx as unknown as CanvasRenderingContext2D);

  expect(ctx.fillRect).toHaveBeenCalledWith(145, 145, 10, 10);
});
