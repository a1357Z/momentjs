scheduleStageMessage: async (req, res) => {
    try {
      const bonusId = req.body.bonusId,
        stageId = req.body.stageId,
        userId = req.body.userId;
      const stageNotificationMessage = await StageNotification.getInitialStageNotification(
        bonusId,
        stageId
      );
      const notificationBatchId = stageNotificationMessage._id;
      const bonusStageData = await BonusModel.getBonusStageData(
        bonusId,
        stageId
      );
      await StageNotification.removeAllScheduledNotifications(userId);
      const currTime = moment().utcOffset("+05:30");
      const currHour = currTime.hours();
      const timeGap = stageNotificationMessage.timeGap.split(" ");
      const firstNotificationTime = currTime.add(timeGap[0], timeGap[1]);

      const nextDay7AMTime = moment(
        currTime.format("YYYY MM DD"),
        "YYYY-MM-DD"
      ).add(31, "h");
      const currDay7AMTime = moment(
        currTime.format("YYYY MM DD"),
        "YYYY-MM-DD"
      ).add(7, "h");
      const currDay7AMTimeInSeconds = currDay7AMTime.unix();
      const nextDay7AMTimeInSeconds = nextDay7AMTime.unix();
      const currTimeInSeconds = currTime.unix();
      const timeDurationBtwNowAndNextDay7AMInSec =
        nextDay7AMTimeInSeconds - currTimeInSeconds;
      const timeDurationBtwNowAndCurrDay7AMInSec =
        currDay7AMTimeInSeconds - currTimeInSeconds;
      const stageDurationInSec = bonusStageData.bonusStages[0].duration * 3600;

      const isRistrictedCurrHour = SchaduleCheck.isInNoNotificationPeriod(
        currTime
      );
      const isRistrictedFirstNotificationHour = SchaduleCheck.isInNoNotificationPeriod(
        firstNotificationTime
      );

      let firstNotificationData = stageNotificationMessage.notificationStages.find(
        val => val.priorityNumber === 1
      );
      let firstNotificationId = firstNotificationData._id;
      let firstNotificationType = firstNotificationData.notificationType;

      if (!isRistrictedCurrHour) {
        if (!isRistrictedFirstNotificationHour) {
          StageNotification.scheduleStageNotification(
            bonusId,
            stageId,
            userId,
            firstNotificationId,
            notificationBatchId,
            firstNotificationType,
            firstNotificationTime
          );
        } else if (stageDurationInSec > timeDurationBtwNowAndNextDay7AMInSec) {
          StageNotification.scheduleStageNotification(
            bonusId,
            stageId,
            userId,
            firstNotificationId,
            notificationBatchId,
            firstNotificationType,
            nextDay7AMTime
          );
        }
      } else {
        if (currHour >= 23) {
          //current time >= 23 hrs
          if (stageDurationInSec > timeDurationBtwNowAndNextDay7AMInSec) {
            //we need to send notification at 7 am tomorrow
            StageNotification.scheduleStageNotification(
              bonusId,
              stageId,
              userId,
              firstNotificationId,
              notificationBatchId,
              firstNotificationType,
              nextDay7AMTime
            );
          }
        } else {
          //current time between 0 and 7 am
          if (stageDurationInSec > timeDurationBtwNowAndCurrDay7AMInSec) {
            //we need to send notification at 7 am today
            StageNotification.scheduleStageNotification(
              bonusId,
              stageId,
              userId,
              firstNotificationId,
              notificationBatchId,
              firstNotificationType,
              currDay7AMTime
            );
          }
        }
      }
      return res.status(201).send(stageNotificationMessage);
    } catch (error) {
      logger.error({
        error: error,
        message: "error in scheduleStageMessage"
      });
      return res.status(500).send("something went wrong");
    }
  }