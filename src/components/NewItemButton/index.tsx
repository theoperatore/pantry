import React, { useState } from 'react';
import { Button } from '../Button';
import { Sheet } from '../Sheet';
import { RenderInPortal } from '../RenderInPortal';
import { IconImg } from '../ItemDetail/styles';
import styled from 'styled-components';
import { PantryItem } from '../../schema/pantry';
import { useUser } from '../../auth/UserContext';
import { addItemTopPantry } from '../../api';

const IconChoices = styled.div`
  overflow-y: scroll;
  height: 40vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const IconChoiceButton = styled(Button)`
  margin: ${(props) => props.theme.spacing.xs};
`;
enum ExpiresInUnits {
  DAY = 'd',
  WEEK = 'w',
  MONTH = 'm',
  YEAR = 'y',
}
type Props = {
  foodImages: { image: string; name: string }[];
  onSaveSuccess: () => void;
};
export const NewItemButton = ({ foodImages, onSaveSuccess }: Props) => {
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(foodImages[0]);
  const user = useUser();
  const [showIconChoices, setShowIconChoices] = useState(false);
  const [expiresValue, setExpiresValue] = useState(0);
  const [expiresUnit, setExpiresUnit] = useState<ExpiresInUnits>(
    ExpiresInUnits.DAY
  );
  const isValidItem =
    name && name.length && expiresValue && expiresUnit && icon;

  const addItem = async () => {
    if (!user) return;

    const item: Omit<Omit<PantryItem, 'id'>, 'created_at_ts'> = {
      name,
      icon_url: `/foods/${icon.image}`,
      is_deleted: false,
      expires_in: `${expiresValue}${expiresUnit}`,
      quantity_type: 'unit',
      quantities: [],
    };

    try {
      const response = await addItemTopPantry(user, item);
      if (response.ok) {
        onSaveSuccess();
        setShowNewDialog(false);
      } else {
        const { status } = await response.json();
        alert(status);
      }
    } catch (error) {
      alert(`Failed to add item: ${error.message}`);
    }
  };
  return (
    <>
      <Button
        onClick={() => setShowNewDialog(true)}
        title="Add a new pantry item"
        disabled={!user}
      >
        new
      </Button>
      <RenderInPortal>
        <Sheet isOpen={showNewDialog} onClose={() => setShowNewDialog(false)}>
          <div>
            <IconChoiceButton
              onClick={() => setShowIconChoices(!showIconChoices)}
            >
              <IconImg
                src={`/foods/${icon.image}`}
                alt={icon.name}
                className="next-to"
              />
            </IconChoiceButton>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="item name..."
            />
            {showIconChoices && (
              <IconChoices>
                {foodImages.map((foodItem) => (
                  <IconChoiceButton
                    onClick={() => {
                      setIcon(foodItem);
                      setShowIconChoices(false);
                    }}
                  >
                    <IconImg src={`/foods/${foodItem.image}`} />
                  </IconChoiceButton>
                ))}
              </IconChoices>
            )}
            <div>
              <p>expires in:</p>
              <input
                type="number"
                min="1"
                max="100"
                value={expiresValue}
                onChange={(e) => setExpiresValue(parseInt(e.target.value, 10))}
              />
              <select
                value={expiresUnit}
                onChange={(e) =>
                  setExpiresUnit(e.target.value as ExpiresInUnits)
                }
              >
                <option value={ExpiresInUnits.DAY}>day(s)</option>
                <option value={ExpiresInUnits.WEEK}>week(s)</option>
                <option value={ExpiresInUnits.MONTH}>month(s)</option>
                <option value={ExpiresInUnits.YEAR}>year(s)</option>
              </select>
            </div>
          </div>
          <Button disabled={!isValidItem} onClick={addItem}>
            save
          </Button>
        </Sheet>
      </RenderInPortal>
    </>
  );
};
