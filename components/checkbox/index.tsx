import * as React from 'react';
import { View } from 'remax/one';
import { getPrefixCls } from '../common';
import Icon from '../icon';

const prefixCls = getPrefixCls('checkbox');

export interface CheckboxProps {
  checked?: boolean;
  value?: string;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onChange?: (e: any, v?: any) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const { children, checked, value, extra, style, onChange } = props;

  const handleClick = () => {
    onChange?.(!checked, value);
  };

  return (
    <View className={prefixCls} style={style}>
      <View className={`${prefixCls}-container`} onTap={handleClick}>
        {checked ? (
          <Icon type="roundcheckfill" size="48px" color="#1890FF" />
        ) : (
          <Icon type="round" size="48px" color="#999" />
        )}
        {children ? <View className={`${prefixCls}-container-label`}>{children}</View> : null}
      </View>
      <View className={`${prefixCls}-extra`}>{extra}</View>
    </View>
  );
};

export interface GroupProps {
  value?: string;
  children?: React.ReactNode;
  direction?: string;
  onChange?: (e: any) => void;
}

const getCheckboxs = (
  children: React.ReactNode,
  value?: string,
  onChange?: (e: any, v: any) => void,
) => {
  const checkboxs = React.Children.map(children, (checkbox: any) => {
    const newCheckbox = checkbox;
    let checked = false;
    if (newCheckbox && newCheckbox.props) {
      if (
        (newCheckbox.props.value || newCheckbox.props.value === 0) &&
        newCheckbox.props.value === value
      ) {
        checked = true;
      } else {
        checked = false;
      }
      return <Checkbox {...newCheckbox.props} checked={checked} onChange={onChange} />;
    }
    return newCheckbox;
  });

  return checkboxs;
};

Checkbox.Group = (props: GroupProps) => {
  const { value, children, direction = 'row', onChange } = props;

  const checkboxs = getCheckboxs(children, value, onChange);

  return (
    <View
      style={
        {
          display: 'flex',
          flexDirection: direction,
        } as React.CSSProperties
      }
    >
      {checkboxs}
    </View>
  );
};

export default Checkbox;

// 注意不要加 React.memo，会导致保错。
