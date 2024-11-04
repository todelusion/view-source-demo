import { useCallback } from "react";
import gsap from "gsap";

interface ScrollToItemOptions {
  /** 滾動動畫的持續時間（秒）*/
  duration?: number;
  /** GSAP 緩動函數名稱 */
  ease?: string;
  /** 是否將目標項目居中顯示 */
  centerItem?: boolean;
}

/**
 * useScrollToItem hook
 *
 * 這個 hook 用於創建一個函數，該函數可以將容器內的特定項目滾動到視圖中。
 *
 * @param containerRef - 滾動容器的 React ref
 * @param listRef - 包含所有項目的列表元素的 React ref
 * @param options - 滾動行為的配置選項
 *
 * @returns 一個函數，調用時可以滾動到指定索引的項目
 *
 * 使用示例：
 * const scrollToItem = useScrollToItem(containerRef, listRef, { duration: 0.7 });
 * scrollToItem(3); // 滾動到索引為 3 的項目
 *
 * 工作原理：
 * 1. 獲取容器和目標項目的尺寸和位置信息
 * 2. 計算需要滾動的距離
 * 3. 使用 GSAP 執行平滑的滾動動畫
 */
export const useScrollToItem = (
  containerRef: React.RefObject<HTMLElement>,
  listRef: React.RefObject<HTMLElement>,
  options: ScrollToItemOptions = {}
) => {
  const { duration = 0.5, ease = "power2.out", centerItem = true } = options;

  const scrollToItem = useCallback(
    (index: number) => {
      if (!containerRef.current || !listRef.current) return;

      const container = containerRef.current;
      const items = listRef.current.children;

      if (index >= 0 && index < items.length) {
        const item = items[index] as HTMLElement;
        const itemLeft = item.offsetLeft;
        const containerWidth = container.clientWidth;
        const itemWidth = item.offsetWidth;

        let scrollLeft: number;

        if (centerItem) {
          // 計算將項目居中所需的滾動位置
          scrollLeft = itemLeft - (containerWidth - itemWidth) / 2;
        } else {
          // 如果不需要居中，直接滾動到項目的左邊緣
          scrollLeft = itemLeft;
        }

        // 使用 GSAP 執行平滑滾動動畫
        gsap.to(container, {
          scrollLeft: scrollLeft,
          duration: duration,
          ease: ease,
        });
      }
    },
    [containerRef, listRef, duration, ease, centerItem]
  );

  return scrollToItem;
};
