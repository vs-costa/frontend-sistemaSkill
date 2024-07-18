import { Button } from 'antd'

interface ButtonProps {
    onClick: () => void;
    text: string;
    type?: 'primary' | 'link' | 'default' | 'dashed' | 'text' | undefined;
    style?: React.CSSProperties;
    danger?: boolean;
}

export function ReusableButton({ onClick, text, type = 'primary', style, danger }: ButtonProps) {
    
    return (
        <Button type={type} onClick={onClick} style={style} danger={danger}>
            {text}
        </Button>
    );
};