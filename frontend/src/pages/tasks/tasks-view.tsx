import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/tasks/tasksSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const TasksView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.tasks);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View tasks')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View tasks')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Title</p>
            <p>{tasks?.title}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={tasks?.description}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Status</p>
            <p>{tasks?.status ?? 'No data'}</p>
          </div>

          <FormField label='StartDate'>
            {tasks.start_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  tasks.start_date
                    ? new Date(
                        dayjs(tasks.start_date).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No StartDate</p>
            )}
          </FormField>

          <FormField label='EndDate'>
            {tasks.end_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  tasks.end_date
                    ? new Date(dayjs(tasks.end_date).format('YYYY-MM-DD hh:mm'))
                    : null
                }
                disabled
              />
            ) : (
              <p>No EndDate</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Project</p>

            <p>{tasks?.project?.name ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Assignee</p>

            <p>{tasks?.assignee?.firstName ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/tasks/tasks-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

TasksView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_TASKS'}>{page}</LayoutAuthenticated>
  );
};

export default TasksView;
