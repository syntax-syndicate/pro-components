import { FieldCheckbox } from '@ant-design/pro-field';
import { ProConfigProvider } from '@ant-design/pro-provider';
import { runFunction } from '@ant-design/pro-utils';
import type { CheckboxProps, CheckboxRef } from 'antd';
import { Checkbox } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import React from 'react';
import { createField } from '../../BaseForm/createField';
import type {
  ProFormFieldItemProps,
  ProFormFieldRemoteProps,
} from '../../typing';
import ProFormField from '../Field';

export type ProFormCheckboxGroupProps = ProFormFieldItemProps<
  CheckboxGroupProps,
  HTMLInputElement
> & {
  layout?: 'horizontal' | 'vertical';
  options?: CheckboxGroupProps['options'];
} & ProFormFieldRemoteProps;

const CheckboxGroup: React.FC<ProFormCheckboxGroupProps> = React.forwardRef(
  ({ options, fieldProps, proFieldProps, valueEnum, ...rest }, ref) => (
    <ProConfigProvider
      valueTypeMap={{
        checkbox: {
          render: (text, props) => <FieldCheckbox {...props} text={text} />,
          formItemRender: (text, props) => (
            <FieldCheckbox {...props} text={text} />
          ),
        },
      }}
    >
      <ProFormField
        ref={ref}
        valueType="checkbox"
        valueEnum={runFunction<[any]>(valueEnum, undefined)}
        fieldProps={{
          options,
          ...fieldProps,
        }}
        lightProps={{
          labelFormatter: () => {
            return (
              <ProFormField
                ref={ref}
                valueType="checkbox"
                mode="read"
                valueEnum={runFunction<[any]>(valueEnum, undefined)}
                filedConfig={{
                  customLightMode: true,
                }}
                fieldProps={{
                  options,
                  ...fieldProps,
                }}
                proFieldProps={proFieldProps}
                {...rest}
              />
            );
          },
          ...rest.lightProps,
        }}
        proFieldProps={proFieldProps}
        {...rest}
      />
    </ProConfigProvider>
  ),
);

export type ProFormCheckboxProps = ProFormFieldItemProps<CheckboxProps>;

/**
 * 多选框的
 *
 * @param
 */
const ProFormCheckboxComponents: React.FC<ProFormCheckboxProps> =
  React.forwardRef<CheckboxRef, ProFormCheckboxProps>(
    ({ fieldProps, children }, ref) => {
      return (
        <Checkbox ref={ref} {...fieldProps}>
          {children}
        </Checkbox>
      );
    },
  );

const ProFormCheckbox = createField<ProFormCheckboxProps>(
  ProFormCheckboxComponents,
  {
    valuePropName: 'checked',
  },
);

const WrappedProFormCheckbox: typeof ProFormCheckboxComponents & {
  Group: typeof CheckboxGroup;
} = ProFormCheckbox as any;

WrappedProFormCheckbox.Group = CheckboxGroup;

export default WrappedProFormCheckbox;
