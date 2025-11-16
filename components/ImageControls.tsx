import React, { useRef } from 'react';
import { ImagePosition } from '../types';
import { CameraIcon, ArrowUpIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, CenterIcon } from './icons';

interface ImageControlsProps {
    onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    position: ImagePosition;
    setPosition: (position: ImagePosition) => void;
    label: string;
}

const STEP = 5; // 5% increment

export const ImageControls: React.FC<ImageControlsProps> = ({ onImageChange, position, setPosition, label }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const move = (axis: 'x' | 'y', direction: 'increment' | 'decrement') => {
        setPosition({
            ...position,
            [axis]: Math.max(0, Math.min(100, position[axis] + (direction === 'increment' ? STEP : -STEP))),
        });
    };

    const resetPosition = () => {
        setPosition({ x: 50, y: 50 });
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <input 
                type="file" 
                accept="image/*"
                ref={fileInputRef} 
                onChange={onImageChange}
                className="hidden" 
                aria-hidden="true"
            />
            <button
                onClick={handleButtonClick}
                className="bg-black bg-opacity-30 p-3 rounded-full text-white hover:bg-opacity-50 transition-all duration-300"
                aria-label={`Mudar imagem da secção ${label}`}
                title={`Mudar imagem da secção ${label}`}
            >
                <CameraIcon className="w-6 h-6" />
            </button>
            
            <div className="bg-black bg-opacity-30 rounded-lg p-1 grid grid-cols-3 gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" title="Ajustar posição da imagem">
                <div /> 
                <button onClick={() => move('y', 'decrement')} className="p-1 text-white hover:bg-opacity-50 hover:bg-gray-500 rounded" aria-label="Mover para cima"><ArrowUpIcon className="w-5 h-5"/></button>
                <div />
                
                <button onClick={() => move('x', 'decrement')} className="p-1 text-white hover:bg-opacity-50 hover:bg-gray-500 rounded" aria-label="Mover para a esquerda"><ArrowLeftIcon className="w-5 h-5"/></button>
                <button onClick={resetPosition} className="p-1 text-white hover:bg-opacity-50 hover:bg-gray-500 rounded" aria-label="Centralizar imagem"><CenterIcon className="w-5 h-5"/></button>
                <button onClick={() => move('x', 'increment')} className="p-1 text-white hover:bg-opacity-50 hover:bg-gray-500 rounded" aria-label="Mover para a direita"><ArrowRightIcon className="w-5 h-5"/></button>

                <div />
                <button onClick={() => move('y', 'increment')} className="p-1 text-white hover:bg-opacity-50 hover:bg-gray-500 rounded" aria-label="Mover para baixo"><ArrowDownIcon className="w-5 h-5"/></button>
                <div />
            </div>
        </div>
    );
};