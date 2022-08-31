import { map } from './utils';
import {group} from "../geometry/utils";

export function inferScales(channels,options) {
  const scaleChannels =group(channels.flatMap(Object.entries),([name])=>scaleName(name))
  const scales = {}
  for (const [name,channels] of scaleChannels){
    const channel =mergeChannels(name,channels)
  }
}


export function applyScales(channels, scales) {
  return map(channels, ({ values, name }) => {
    const scale = scales[scaleName(name)];
    return values.map(scale);
  });
}
function scaleName(name) {
  if (name.startsWith('x')) return 'x';
  if (name.startsWith('y')) return 'y';
  if (isColor(name)) return 'color';
  return name;
}

function isColor(name) {
  return name === 'fill' || name === 'stroke';
}
