import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header Component', () => {
  it('renders company name', () => {
    render(<Header />);
    expect(screen.getByText('アイアンショップ')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    
    expect(screen.getByText('ホーム')).toBeInTheDocument();
    expect(screen.getByText('会社概要')).toBeInTheDocument();
    expect(screen.getByText('ギャラリー')).toBeInTheDocument();
    expect(screen.getByText('お問い合わせ')).toBeInTheDocument();
  });

  it('has correct navigation structure', () => {
    render(<Header />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('renders logo image', () => {
    render(<Header />);
    const logo = screen.getByAltText('アイアンショップ ロゴ');
    expect(logo).toBeInTheDocument();
  });
});