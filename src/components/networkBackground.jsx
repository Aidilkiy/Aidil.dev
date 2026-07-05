"use client";

import { useEffect, useRef } from "react";

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let nodes = [];
    let frame;
    let isPageVisible = true;

    const createNodes = () => {
      const nodeCount = width < 768 ? 18 : Math.min(44, Math.max(30, Math.floor((width * height) / 36000)));

      // Speed is a fixed pixel amount, so it must scale with screen width or it
      // visually "crosses" a small phone screen much faster than a wide desktop
      // one at the same absolute speed. 1280px is the desktop width the base
      // speed values were tuned against.
      const speedScale = Math.min(1.5, Math.max(0.3, width / 1280));
      const minimumSpeed = 0.038 * speedScale;
      const speedRange = 0.024 * speedScale;

      nodes = Array.from({ length: nodeCount }, (_, index) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = minimumSpeed + Math.random() * speedRange;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseSpeed: speed,
          radius: Math.random() * 1.4 + 1,
          phase: Math.random() * Math.PI * 2,
          color: index % 4 === 0 ? [251, 113, 133] : index % 3 === 0 ? [45, 212, 191] : [56, 189, 248],
        };
      });
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.35);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createNodes();
    };

    const draw = (time = 0) => {
      if (!isPageVisible) return;

      context.clearRect(0, 0, width, height);

      for (let index = 0; index < nodes.length; index += 1) {
        const node = nodes[index];

        if (!reduceMotion) {
          const pointerDistance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
          if (pointerDistance < 130 && pointerDistance > 0) {
            node.vx += ((node.x - pointer.x) / pointerDistance) * 0.0003;
            node.vy += ((node.y - pointer.y) / pointerDistance) * 0.0003;
          }

          // Damp speed back toward this node's resting pace so a cursor nudge
          // fades out naturally instead of leaving the node stuck at top speed.
          const currentSpeed = Math.hypot(node.vx, node.vy);
          if (currentSpeed > node.baseSpeed) {
            const dampedSpeed = currentSpeed + (node.baseSpeed - currentSpeed) * 0.04;
            node.vx = (node.vx / currentSpeed) * dampedSpeed;
            node.vy = (node.vy / currentSpeed) * dampedSpeed;
          }

          node.x += node.vx;
          node.y += node.vy;

          if (node.x < -10) node.x = width + 10;
          if (node.x > width + 10) node.x = -10;
          if (node.y < -10) node.y = height + 10;
          if (node.y > height + 10) node.y = -10;
        }

        for (let connectionIndex = index + 1; connectionIndex < nodes.length; connectionIndex += 2) {
          const connection = nodes[connectionIndex];
          const distance = Math.hypot(node.x - connection.x, node.y - connection.y);

          if (distance < 160) {
            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(connection.x, connection.y);
            context.strokeStyle = `rgba(45, 212, 191, ${(1 - distance / 160) * 0.14})`;
            context.lineWidth = 0.8;
            context.stroke();
          }
        }

        const pulse = reduceMotion ? 1 : 0.86 + Math.sin(time * 0.00055 + node.phase) * 0.14;
        context.beginPath();
        context.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        context.fillStyle = `rgba(${node.color.join(",")}, 0.58)`;
        context.fill();
      }

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };

    const updatePointer = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const clearPointer = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;

      if (isPageVisible && !reduceMotion) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", clearPointer);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", clearPointer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
};

export default NetworkBackground;
