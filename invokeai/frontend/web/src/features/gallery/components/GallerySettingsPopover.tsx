import { Flex } from '@chakra-ui/react';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import IAIIconButton from 'common/components/IAIIconButton';
import IAIPopover from 'common/components/IAIPopover';
import IAISimpleCheckbox from 'common/components/IAISimpleCheckbox';
import IAISlider from 'common/components/IAISlider';
import IAISwitch from 'common/components/IAISwitch';
import {
  autoAssignBoardOnClickChanged,
  setGalleryImageMinimumWidth,
  shouldAutoSwitchChanged,
} from 'features/gallery/store/gallerySlice';
import { ChangeEvent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FaWrench } from 'react-icons/fa';
import BoardAutoAddSelect from './Boards/BoardAutoAddSelect';

const selector = createMemoizedSelector([stateSelector], (state) => {
  const { galleryImageMinimumWidth, shouldAutoSwitch, autoAssignBoardOnClick } =
    state.gallery;

  return {
    galleryImageMinimumWidth,
    shouldAutoSwitch,
    autoAssignBoardOnClick,
  };
});

const GallerySettingsPopover = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { galleryImageMinimumWidth, shouldAutoSwitch, autoAssignBoardOnClick } =
    useAppSelector(selector);

  const handleChangeGalleryImageMinimumWidth = useCallback(
    (v: number) => {
      dispatch(setGalleryImageMinimumWidth(v));
    },
    [dispatch]
  );

  const handleResetGalleryImageMinimumWidth = useCallback(() => {
    dispatch(setGalleryImageMinimumWidth(64));
  }, [dispatch]);

  const handleChangeAutoSwitch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(shouldAutoSwitchChanged(e.target.checked));
    },
    [dispatch]
  );

  const handleChangeAutoAssignBoardOnClick = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(autoAssignBoardOnClickChanged(e.target.checked)),
    [dispatch]
  );

  return (
    <IAIPopover
      triggerComponent={
        <IAIIconButton
          tooltip={t('gallery.gallerySettings')}
          aria-label={t('gallery.gallerySettings')}
          size="sm"
          icon={<FaWrench />}
        />
      }
    >
      <Flex direction="column" gap={2}>
        <IAISlider
          value={galleryImageMinimumWidth}
          onChange={handleChangeGalleryImageMinimumWidth}
          min={45}
          max={256}
          hideTooltip={true}
          label={t('gallery.galleryImageSize')}
          withReset
          handleReset={handleResetGalleryImageMinimumWidth}
        />
        <IAISwitch
          label={t('gallery.autoSwitchNewImages')}
          isChecked={shouldAutoSwitch}
          onChange={handleChangeAutoSwitch}
        />
        <IAISimpleCheckbox
          label={t('gallery.autoAssignBoardOnClick')}
          isChecked={autoAssignBoardOnClick}
          onChange={handleChangeAutoAssignBoardOnClick}
        />
        <BoardAutoAddSelect />
      </Flex>
    </IAIPopover>
  );
};

export default memo(GallerySettingsPopover);
