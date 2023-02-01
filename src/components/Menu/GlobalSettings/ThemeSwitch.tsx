import React from 'react'
import { Flex, IconButton, CogIcon, useModal, Button, ThemeSwitcher } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import SettingsModal from './SettingsModal'

const ThemeSwitch = () => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)
  const { theme, isDark, toggleTheme } = useTheme()

  return (
    <Flex>
      {/* <IconButton onClick={onPresentSettingsModal} variant="text" scale="sm" mr="8px" id="open-settings-dialog-button">
        <CogIcon height={24} width={24} color="textSubtle" />
      </IconButton> */}
        <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
    </Flex>
  )
}

export default ThemeSwitch
