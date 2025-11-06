import {TuiControlStateAdapter} from '../control-state-adapter';
import type {TuiControl} from '../control';

describe('TuiControlStateAdapter', () => {
    describe('Abstract Class Definition', () => {
        it('should be defined', () => {
            expect(TuiControlStateAdapter).toBeDefined();
        });
    });

    describe('Type Safety', () => {
        it('should preserve generic type parameter', () => {
            class StringAdapter extends TuiControlStateAdapter<string> {
                public setup(control: TuiControl<string>): void {
                    expect(control).toBeDefined();
                }

                public update(control: TuiControl<string>): void {
                    expect(control).toBeDefined();
                }
            }

            const adapter = new StringAdapter();

            expect(adapter).toBeInstanceOf(TuiControlStateAdapter);
        });

        it('should use unknown for unspecified generic', () => {
            class GenericAdapter extends TuiControlStateAdapter {
                public setup(control: TuiControl<unknown>): void {
                    expect(control).toBeDefined();
                }

                public update(control: TuiControl<unknown>): void {
                    expect(control).toBeDefined();
                }
            }

            const adapter = new GenericAdapter();

            expect(adapter).toBeInstanceOf(TuiControlStateAdapter);
        });
    });

    describe('Required Methods', () => {
        it('should require both setup and update methods', () => {
            class CompleteAdapter extends TuiControlStateAdapter<string> {
                public setup(): void {}
                public update(): void {}
            }

            const adapter = new CompleteAdapter();

            expect(adapter.setup).toBeDefined();
            expect(adapter.update).toBeDefined();
        });
    });

    describe('Optional Methods', () => {
        it('should allow optional destroy method', () => {
            class CleanupAdapter extends TuiControlStateAdapter<string> {
                public setup(): void {}
                public update(): void {}
                public override destroy(): void {
                    // Cleanup logic
                }
            }

            const adapter = new CleanupAdapter();

            expect(adapter.destroy).toBeDefined();
            expect(typeof adapter.destroy).toBe('function');
        });

        it('should work without destroy method', () => {
            class MinimalAdapter extends TuiControlStateAdapter<string> {
                public setup(): void {}
                public update(): void {}
            }

            const adapter = new MinimalAdapter();

            expect(adapter.destroy).toBeUndefined();
        });
    });

    describe('Method Signatures', () => {
        it('should pass control to setup method', () => {
            let receivedControl: TuiControl<string> | null = null;

            class SpyAdapter extends TuiControlStateAdapter<string> {
                public setup(control: TuiControl<string>): void {
                    receivedControl = control;
                }

                public update(): void {}
            }

            const adapter = new SpyAdapter();
            const mockControl = {} as TuiControl<string>;

            adapter.setup(mockControl);

            expect(receivedControl).toBe(mockControl);
        });

        it('should pass control to update method', () => {
            let receivedControl: TuiControl<string> | null = null;

            class SpyAdapter extends TuiControlStateAdapter<string> {
                public setup(): void {}

                public update(control: TuiControl<string>): void {
                    receivedControl = control;
                }
            }

            const adapter = new SpyAdapter();
            const mockControl = {} as TuiControl<string>;

            adapter.update(mockControl);

            expect(receivedControl).toBe(mockControl);
        });
    });
});
