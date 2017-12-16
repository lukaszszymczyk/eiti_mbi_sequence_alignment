/**
 * Abstract Event generated by simulator.
 */
import {PathElement} from './path-element';
import construct = Reflect.construct;

export abstract class AppEvent {
  protected cellToString(idx: number[]): string {
    return 'Cell(' + idx[0] + ', ' + idx[1] + ', ' + idx[2] + ')';
  }

  protected symbolsToString(idx: string[]): string {
    return 'Symbols(' + idx[0] + ', ' + idx[1] + ', ' + idx[2] + ')';
  }

  public abstract toString(): string;
}

/**
 * Cell has been filled with value event.
 */
export class CellFilledEvent extends AppEvent {
  constructor(private pathElement: PathElement) {
    super();
  }

  public toString(): string {
    return this.cellToString(this.pathElement.endIdx) + ' filled with ' + this.pathElement.endCellVal;
  }
}

/**
 * Element of the path has been reconstructed.
 */
export class PathElementReconstructedEvent extends AppEvent {
  constructor(private pathElement: PathElement) {
    super();
  }

  public toString(): string {
    return this.cellToString(this.pathElement.startIdx) + ' is previous which results in ' + this.symbolsToString(this.pathElement.symbols);
  }
}

/**
 * Simulation is finished
 */
export class SimulationFinishedEvent extends AppEvent {
  constructor(private path: PathElement[]) {
    super();
  }

  public toString(): string {
    let result = 'Simulation finished with alignment:\n';
    for (let i = 0; i < 3; ++i) {
      let sequence = '';
      for (let idx = 0; idx < this.path.length; ++idx) {
        sequence += this.path[idx].symbols[i];
      }
      result += 'Sequence ' + (i + 1) + ': ' + sequence + '\n';
    }
    return result;
  }
}
