import type {TuiControl} from './control';

/**
 * Abstract adapter for external state management systems.
 *
 * Allows Taiga UI controls to integrate with external form libraries
 * (like Angular Signal Forms) without creating direct dependencies.
 *
 * @example
 * ```typescript
 * @Injectable()
 * export class SignalFormsAdapter<T> extends TuiControlStateAdapter<T> {
 *   public setup(control: TuiControl<T>): void {
 *     // Setup bidirectional synchronization
 *   }
 *
 *   public update(control: TuiControl<T>): void {
 *     // Sync external state to control
 *   }
 *
 *   public destroy(): void {
 *     // Optional cleanup
 *   }
 * }
 * ```
 */
export abstract class TuiControlStateAdapter<T = unknown> {
    /**
     * Called once during TuiControl construction.
     * Setup bidirectional synchronization between external state and control.
     *
     * @param control - The TuiControl instance to synchronize with
     */
    public abstract setup(control: TuiControl<T>): void;

    /**
     * Called whenever control state needs updating from external source.
     * Override to implement external state → TuiControl synchronization.
     *
     * Note: TuiControl still calls markForCheck() after this method.
     *
     * @param control - The TuiControl instance to update
     */
    public abstract update(control: TuiControl<T>): void;

    /**
     * Optional cleanup hook called when control is destroyed.
     * Use for unsubscribing, cleanup, or resource disposal.
     */
    public destroy?(): void;
}
