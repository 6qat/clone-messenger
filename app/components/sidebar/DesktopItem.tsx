'use client';
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface DesktopItemProps {
  href: string;
  icon: any;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem = ({
  href,
  icon: Icon,
  label,
  onClick,
  active,
}: DesktopItemProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          'gap-3-3 group flex rounded-md p-3 text-sm font-semibold leading-6 text-gray-500 hover:bg-gray-100 hover:text-black',
          active && 'bg-gray-100 text-black',
        )}
      >
        <Icon
          className={`h-6 w-6 shrink-0`}
          aria-hidden='true'
        ></Icon>
        <span className={`sr-only`}>{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
